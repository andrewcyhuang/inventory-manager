import { productType } from './enums';

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

const createParameterizedColumns = (values) => {
    let count = 0;

    return values.map(val => {
        count++;
        return `$${count}`;
    }).join(',');
}