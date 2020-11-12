import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { Pool } from 'pg';
import Constants from './src/constants';

require('dotenv').config();

const pool = new Pool({
    host: 'localhost',
    database: 'inventoryManager',
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


app.listen(process.env.PORT || Constants.portServer, () => {
    console.log(`express app is running on port ${process.env.PORT || Constants.portServer}`);
})