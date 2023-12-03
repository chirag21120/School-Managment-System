const { Pool } = require('pg');
const dotenv = require('dotenv').config();
const pool = new Pool({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password:process.env.DBPASS,
    database: "school"
});

module.exports = pool