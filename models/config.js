const { Pool } = require('pg');
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
    user: 'postgres',
    password: '359157',
    host: 'localhost',
    port: 5432,
    database: 'Tourism'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};