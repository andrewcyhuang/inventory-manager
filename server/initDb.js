const { Client } = require('pg');

async function init() {
    const client = new Client({
        host: 'localhost',
        database: 'postgres',
        user: 'me',
        password: 'password1',
        port: 5432
    });

    await client.connect();

    const checkdb = await client.query(`SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'inventorymanager';`);

    if (!checkdb || !checkdb.rows || !checkdb.rows[0]) {
        await client.query(`CREATE DATABASE inventorymanager;`)
    }
}

init()
    .then(() => {process.exit(0);})
    .catch(e => {
    console.error(e);
    process.exit(1);
});