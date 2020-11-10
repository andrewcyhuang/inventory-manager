const express = require('express');

require('dotenv').config();

const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const Pool = require('pg').Pool;
const pool = new Pool({
    host: 'localhost',
    database: 'inventoryManager',
    user: 'me',
    password: 'password1',
    port: 5432
});

const app = express();

const whitelist = ['http://localhost:3001'];
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


app.listen(process.env.PORT || 3000, () => {
    console.log(`express app is running on port ${process.env.PORT || 3000}`);
})