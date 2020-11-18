import { productType, orderType } from './enums';
import * as Dummy from './dummyData';

// Operations on Inventory Table
export const createInventory = async (poolClient, inventory) => {
    await initLocation(poolClient, inventory);

    const id = await getNextId(poolClient);

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(`INSERT INTO inventory (id, unit, street, postal_code)
            VALUES ($1, $2, $3, $4)`,
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

    const queryString = `UPDATE inventory SET unit = $1, street = $2, postal_code = $3 WHERE id = $4`;
    const values = [parseInt(inventory.unit), inventory.street, inventory.postalCode, inventory.id];

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
        values.push(parseInt(inventoryId));
    }

    const result = await poolClient.query(queryString, values);

    return result.rows;
}

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
    const result = await poolClient.query(queryString, [productType.DIGITAL]);

    return result.rows;
}

export const getPhysicalProducts = async (poolClient) => {
    const queryString = `SELECT sku, name, price, type, weight, width, length, height FROM product WHERE type = $1`;
    const result = await poolClient.query(queryString, [productType.PHYSICAL]);

    return result.rows;
}

export const getProductByPriceRange = async (poolClient, min, max) => {
    const queryString = `SELECT * FROM product WHERE $1 < price AND price < $2;`;
    const result = await poolClient.query(queryString, [min, max]);

    return result.rows;
};

export const groupByAggregationProducts = async (poolClient, aggregation, aggregateField) => {
    const queryString = `SELECT type, $1($2) FROM product GROUP BY type`;
    const values = [aggregation, aggregateField];

    const result = await poolClient.query(queryString, values);
    
    return result.rows;
};

export const getProductLocations = async (poolClient, sku) => {
    const queryString = `SELECT * FROM inventory_contains_product WHERE sku = $1`;
    
    let result = await poolClient.query(queryString, [sku]);

    return result.rows;
}

export const insertProductIntoInventory = async (poolClient, reqBody) => {
    const queryString = `INSERT INTO inventory_contains_product (inventory_id, sku, quantity) 
        VALUES ($1, $2, $3)
        ON CONFLICT (inventory_id, sku) DO UPDATE
        SET quantity = inventory_contains_product.quantity + $3
        `;
    const values = [parseInt(reqBody.inventory_id), reqBody.sku, parseInt(reqBody.quantity)];

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, values);

        await poolClient.query('COMMIT');
        console.log(`insertion complete: ${values}`);
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
};

export const updateQuantityFromInventory = async (poolClient, body) => {
    const queryString = `UPDATE inventory_contains_product SET quantity = quantity + $1 WHERE inventory_id = $2 AND sku = $3`;
    const values = [parseInt(body.quantity), parseInt(body.inventory_id), body.sku];

    try {
        await poolClient.query('BEGIN');
        await poolClient.query(queryString, values);
        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
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

// Operations on Orders Table
export const createOrder = async (poolClient, order) => {
    const id = await getNextId(poolClient);

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(`INSERT INTO orders (id, inventory_id, type, employee_id, customer_name, 
                                                    customer_email, customer_payment_type, customer_address, reason)
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [id, parseInt(order.inventory_id), order.type, parseInt(order.employee_id), order.customer_name,
                order.customer_email, order.customer_payment_type, order.customer_address, order.reason]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

export const populateOrder = async (poolClient, orderId, sku, quantity) => {
    try {
        await poolClient.query('BEGIN');

        await poolClient.query(`INSERT INTO order_has_product (order_id, sku, quantity)
            VALUES ($1, $2, $3)`,
            [parseInt(orderId), sku, parseInt(quantity)]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

export const updateOrder = async (poolClient, order) => {
    const {id, ...updateFields} = order;

    try {
        await poolClient.query('BEGIN');
        let values = [];
        let count = 0;
        let updateColumns = Object.keys(updateFields).map(fieldKey => {
            values.push(order[fieldKey]);
            count++;
            return `${fieldKey} = ($${count})`;
        }).join(',');

        count++;
        values.push(id);
        let queryString =  `UPDATE orders SET ${updateColumns} WHERE id = $${count}`;
        await poolClient.query(queryString, values);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
};

export const cancelOrder = async (poolClient, orderId) => {
    const queryString = "DELETE FROM orders WHERE id = $1";

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, [parseInt(orderId)]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

export const getOrderInfo = async (poolClient, orderId) => {
    let queryString = `SELECT * FROM orders o, order_has_product op
                        WHERE o.id = $1 AND o.id = op.order_id`;
    const values = [parseInt(orderId)];

    let result = await poolClient.query(queryString, values);

    return result.rows;
};

export const createOrderShipment = async (poolClient, orderId, shipmentCompany) => {
    const id = await getNextId(poolClient);

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(`INSERT INTO order_shipment (tracking_number, order_id, shipping_company)
            VALUES ($1, $2, $3)`,
            [id.toString(), parseInt(orderId), shipmentCompany]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

export const cancelShipment = async (poolClient, trackingNumber) => {
    const queryString = "DELETE FROM order_shipment WHERE tracking_number = $1";

    try {
        await poolClient.query('BEGIN');

        await poolClient.query(queryString, [trackingNumber]);

        await poolClient.query('COMMIT');
    } catch (e) {
        await poolClient.query('ROLLBACK');
        throw e;
    }
}

export const getShipmentInfo = async (poolClient, trackingNumber) => {
    const queryString = "SELECT * FROM order_shipment WHERE tracking_number = $1";
    let res = await poolClient.query(queryString, [trackingNumber]);
    return res.rows;
}

export const getPurchaseOrderCount = async (poolClient) => {
    let queryString = `SELECT count(*) FROM orders
                        GROUP BY type
                        HAVING type = $1`;
    let res = await poolClient.query(queryString, [orderType.PURCHASE]);
    return res.rows;
}

export const getRestockOrderCount = async (poolClient) => {
    let queryString = `SELECT count(*) FROM orders
                        GROUP BY type
                        HAVING type = $1`;
    let res = await poolClient.query(queryString, [orderType.RESTOCK]);
    return res.rows;
}

export const getReturnOrderCount = async (poolClient) => {
    let queryString = `SELECT count(*) FROM orders
                        GROUP BY type
                        HAVING type = $1`;
    let res = await poolClient.query(queryString, [orderType.RETURN]);
    return res.rows;
}

// Helpers
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