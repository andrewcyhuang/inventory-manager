import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { Pool } from 'pg';
import { StatusCodes } from 'http-status-codes';
import Constants from './src/constants';
import * as Queries from './src/queries';
import { productType } from './src/enums';

require('dotenv').config();

const pool = new Pool({
    host: 'localhost',
    database: 'inventorymanager',
    user: 'me',
    password: 'password1',
    port: 5432
});

const app = express();

const whitelist = [`${Constants.baseUrl}${Constants.portClient}`];
const corsConfig = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('CORS Error'));
        }
    }
}

app.use(helmet());
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(morgan('combined'));

app.get('/', (req, res) => res.send('hello world'));

app.post(Constants.apiPrefix + Constants.dummyPrefix + Constants.initPrefix, async (req, res) => {
    const poolClient = await pool.connect();
    try {
        await Queries.initProductDummyData(poolClient);
        
        res.status(StatusCodes.CREATED)
            .send(`Init dummy data complete!`);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(`Init dummy data failed ${e}`);
    } finally {
        if (poolClient) {
            poolClient.release();
        }
    }
});

app.post(Constants.apiPrefix + Constants.productPrefix, async (req, res) => {
    const poolClient = await pool.connect();
    try {
        const { productConfig } = req.body;

        if (productConfig) {
            await Queries.createProduct(poolClient, productConfig);
        } else {
            throw new Error(`Missing input body: productConfig`);
        }

        res.status(StatusCodes.CREATED)
            .send(`Your new product has been added to the products table!`);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(`Your new product failed to be added to the products table. ${e}`);
    } finally {
        if (poolClient) {
            await poolClient.release();
        }
    }
});

app.get(Constants.apiPrefix + Constants.productPrefix, async (req, res) => {
    const poolClient = await pool.connect();

    try {
        const result = await Queries.getProducts(poolClient);
        res.status(StatusCodes.OK)
            .send(JSON.parse(JSON.stringify(result)));
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(`Your new product info failed to be updated. ${e}`);
    } finally {
        if (poolClient) {
            await poolClient.release();
        }
    }
});

app.get(Constants.apiPrefix + Constants.inventoryPrefix, async (req, res) => {
    const poolClient = await pool.connect();

    try {
        const result = await Queries.getInventory(poolClient);
        res.status(StatusCodes.OK)
            .send(JSON.parse(JSON.stringify(result)));
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(`Your new product info failed to be updated. ${e}`);
    } finally {
        if (poolClient) {
            await poolClient.release();
        }
    }
});

app.get(Constants.apiPrefix + Constants.inventoryContainsProductsPrefix, async (req, res) => {
    const poolClient = await pool.connect();

    try {
        const result = await Queries.getInventoryContainsProduct(poolClient);
        res.status(StatusCodes.OK)
            .send(JSON.parse(JSON.stringify(result)));
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send(`Your new product info failed to be updated. ${e}`);
    } finally {
        if (poolClient) {
            await poolClient.release();
        }
    }
});


app.listen(process.env.PORT || Constants.portServer, () => {
    console.log(`express app is running on port ${process.env.PORT || Constants.portServer}`);
});