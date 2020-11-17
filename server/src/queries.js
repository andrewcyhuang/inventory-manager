import { productType } from './enums';
import * as Dummy from './dummyData';

// Operations on Inventory Table
export const createInventory = async (poolClient, inventory) => {
    await initLocation(poolClient, inventory);

    const id = await getNextId(poolClient);

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(`INSERT INTO inventory (id, unit, street, postal_code)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (id)
            DO NOTHING`,
            [parseInt(id), parseInt(inventory.unit), inventory.street, inventory.postalCode]);

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
    const values = [inventory.id, parseInt(inventory.unit), inventory.street, inventory.postalCode];

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, values);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

// Pass only poolClient to getAll, otherwise, pass a specific id to get a specific inventory
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

// Operations on Product Table
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

export const deleteProduct = async (poolClient, sku) => {
    const queryString = "DELETE FROM inventory WHERE sku = $1";

    try {
        await poolClient.query('BEGIN');
        await poolClient.query(queryString, [sku]);
        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
};

export const updateProduct = async (poolClient, product) => {
    const {sku, ...updateFields} = product;

    try {
        await poolClient.query('BEGIN');
        let values = [];
        let count = 0;
        let updateColumns = Object.keys(updateFields).map(fieldKey => {
            values.push(product[fieldKey]);
            count++;
            return `${fieldKey} = ($${count})`;
        }).join(',');

        count++;
        values.push(sku);
        let queryString =  `UPDATE product SET ${updateColumns} WHERE sku = ($${count})`;
        await poolClient.query(queryString, values);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
};

export const getProducts = async (poolClient) => {
    const queryString = `SELECT * FROM product`;
    const result = await poolClient.query(queryString);

    return result.rows;
};

export const getDigitalProducts = async (poolClient) => {
    const queryString = `SELECT sku, name, price, type, url FROM product WHERE type = $1`;
    const result = await poolClient.queryString(queryString, [productType.DIGITAL]);

    return result.rows;
}

export const getPhysicalProducts = async (poolClient) => {
    const queryString = `SELECT sku, name, price, type, weight, width, length, height FROM product WHERE type = $1`;
    const result = await poolClient.queryString(queryString, [productType.PHYSICAL]);

    return result.rows;
}

export const groupByAggregationProducts = async (poolClient, type, aggregation, aggregateField) => {
    const queryString = `SELECT type, $1($2) FROM product GROUP BY ($3)`;
    const values = [aggregation, aggregateField, type];

    const result = await poolClient.query(queryString, values);
    
    return result.rows;
};

export const getProductInInventories = async (poolClient, sku, aggregation, aggregateField) => {
    const queryString = `SELECT inventory_id, quantity, price
        FROM inventory_contains_product, product
        WHERE inventory_contains_product.sku = $3
        AND inventory_contains_product.sku = product.sku 
        GROUP BY (inventory_id)
        HAVING COUNT(*) > 0`;
        
    const values = [aggregation, aggregateField, sku];

    const result = await poolClient.query(queryString, values);
};

export const insertProductIntoInventory = async (poolClient, inventoryId, sku, quantity) => {
    const queryString = `INSERT INTO inventory_contains_product (inventory_id, sku, quantity) 
        VALUES ($1, $2, $3)
        ON CONFLICT (inventory_id, sku) DO
        UPDATE SET
            quantity = excluded.quantity + $3
        `;
    const values = [parseInt(inventoryId), sku, parseInt(quantity)];

    console.log(JSON.stringify(values));

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, values);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
};

export const deductItemsFromInventory = async (poolClient, inventoryId, sku, quantity) => {
    const currentQuantity = await getProductQuantity(poolClient, inventoryId, sku);

    if (currentQuantity && currentQuantity[0] && currentQuantity[0] >= quantity) {
        const queryString = `UPDATE inventory_contains_product SET quantity = quantity - $1 WHERE inventory_id = $2 AND sku = $3`;
        const values = [parseInt(quantity), parseInt(inventoryId), sku];

        try {
            await poolClient.query('BEGIN');
            await poolClient.query(queryString, values);
            await poolClient.query('COMMIT');
        } catch (e) {
            await poolClient.query('ROLLBACK');
            throw e;
        }
    } else {
        throw new Error(`Insufficient stock remaining: ${currentQuantity[0]}`);
    }
};

export const getInventoryContainsProduct = async (poolClient) => {
    let queryString = `SELECT * FROM inventory_contains_product ORDER BY (inventory_id) ASC`;

    let result = await poolClient.query(queryString);

    return result.rows;
};
// Pass only poolClient and inventoryId to get all products at a location
export const getInventoryProducts = async (poolClient, inventoryId) => {
    let queryString = `SELECT * FROM inventory_contains_product WHERE inventory_id = $1 ORDER BY (inventory_id) ASC`;
    const values = [parseInt(inventoryId)];

    let result = await poolClient.query(queryString, values);

    return result.rows;
};

export const getProductLocations = async (poolClient, sku) => {
    const queryString = `SELECT * FROM inventory_contains_product WHERE sku = $1`;
    
    let result = await poolClient.query(queryString, [sku]);

    return result.rows;
}

export const initProductDummyData = async (poolClient) => {
    try {
        const productSkus = [];
        let len = Dummy.dummyProductData.length;
        for (let i = 0; i < len; i++) {
            const jsonProduct = JSON.parse(JSON.stringify(Dummy.dummyProductData[i]));
            productSkus.push(jsonProduct.sku);
            await createProduct(poolClient, jsonProduct);
        };

        let inventories = await getInventory(poolClient);
        console.log(`got inventory`);

        if (!inventories || !inventories[0]) {
            len = Dummy.dummyInventoryData.length;
            for (let i = 0; i < len; i++) {
                const jsonInventory = JSON.parse(JSON.stringify(Dummy.dummyInventoryData[i]));
                await createInventory(poolClient, jsonInventory);
            };
            inventories = await getInventory(poolClient);
        }

        if (inventories && inventories[0]) {
            for (let i = 0; i < inventories.length; i++) {
                const jsonInventory = JSON.parse(JSON.stringify(inventories[i]));

                for (let j = 0; j < productSkus.length; j++) {
                    const q = Math.floor(Math.random() * 101);
                    await insertProductIntoInventory(poolClient, jsonInventory.id, productSkus[j], q);
                }
            };
        }
    } catch (e) {
        throw new Error(`Init product dummy data failed. ${e}`);
    }
}
const getProductQuantity = async (poolClient, inventoryId, sku) => {
    const queryString = `SELECT quantity FROM inventory_contains_product WHERE inventory_id = $1 AND sku = $2`;
    
    const result = await poolClient.query(queryString, [parseInt(inventoryId), sku]);

    return result.rows;
}

const initLocation = async (poolClient, inventory) => {
    try {
        await poolClient.query('BEGIN');

        await poolClient.query(`INSERT INTO location (postal_code, city, province)
            VALUES ($1, $2, $3)
            ON CONFLICT (postal_code)
            DO NOTHING`,
            [inventory.postalCode, inventory.city, inventory.province]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
};

const getNextId = async (poolClient) => {
    const result = await poolClient.query(`SELECT NEXTVAL('seqId')`);

    if (result && result.rows && result.rows[0]) {
        return result.rows[0].nextval;
    } else {
        throw new Error(`Error getting next Id.`);
    }
};

const createParameterizedColumns = (values) => {
    let count = 0;

    return values.map(val => {
        count++;
        return `$${count}`;
    }).join(',');
};