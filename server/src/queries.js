import { productType } from './enums';


/* Insertion: add a new inventory to the inventories list.
Deletion: remove an inventory from the inventories list.
Update: update the address of a particular inventory from the inventories list.
Retrieval: get a particular inventory from the inventories list.
*/

export const createInventory = async (poolClient, inventory) => {
    await initLocation(poolClient, inventory.postalCode);

    const id = await getNextId(poolClient);

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(`INSERT INTO inventory (id, unit, street, postal_code)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id)
            DO NOTHING`,
            [id, inventory.unit, inventory.street, inventory.postalCode]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

export const deleteInventory = async (poolClient, inventoryId) => {
    const queryString = "DELETE FROM inventory WHERE id = $1";

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, [parseInt(inventoryId)]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

export const updateInventory = async (poolClient, inventory) => {
    await initLocation(poolClient, inventory.postalCode);

    const queryString = `UPDATE inventory SET unit = $1, street = $2, postal_code = $3`;
    const values = [inventory.id, inventory.unit, inventory.street, inventory.postalCode];

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, values);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

export const getInventory = async (poolClient, inventoryId = null) => {
    let queryString = `SELECT * FROM inventory`;
    let values = [];

    if (inventoryId) {
        queryString =  `SELECT * FROM inventory WHERE id = $1`;
        values = parseInt(inventoryId);
    }

    const result = await poolClient.query(queryString, values);

    return result.rows;
}


const initLocation = async (poolClient, inventory) => {
    let result = await poolClient.query(`SELECT * FROM location WHERE postal_code = ${inventory.postalCode}`);
    
    if (result && result.rows && result.rows[0]) {
        return result.rows[0];
    } else {
        try {
            await poolClient.query('BEGIN');
    
            await poolClient.query(`INSERT INTO location (postal_code, city, province)
                VALUES ($1, $2, $3)
                ON CONFLICT (postal_code)
                DO NOTHING`,
                [location.postalCode, inventory.city, inventory.province]);
    
            await poolClient.query('COMMIT');
        } catch (e) {
            await poolClient.query('ROLLBACK');
            throw e;
        }
    }
}

/* Product object = {sku: string, name: string, price: number, type: enum, weight?: number, 
    width?: number, length?: number, height?: number, url?: string} */
export const createProduct = async (poolClient, product) => {
    let columns = ['sku', 'name', 'price', 'type'];
    let values = [product.sku, product.name, parseInt(product.price), product.type];
    if (product.type == productType.PHYSICAL) {
        columns = [...columns, 'weight', 'width', 'length', 'height'];
        values = [...values, parseFloat(product.weight), parseFloat(product.width), parseFloat(product.length), parseFloat(product.height)];
    } else {
        columns = [...columns, 'url'];
        values = [...values, product.url];
    }

    const stringifiedColumns = columns.join(',');
    const parameterizedColumns = createParameterizedColumns(values);

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(`INSERT INTO product (${stringifiedColumns}) 
            VALUES (${parameterizedColumns})
            ON CONFLICT (sku)
            DO NOTHING`, values);
        
        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
};

const getNextId = async (poolClient) => {
    return await poolClient.query(`SELECT NEXTVAL('seqId')`);
}

const createParameterizedColumns = (values) => {
    let count = 0;

    return values.map(val => {
        count++;
        return `$${count}`;
    }).join(',');
}