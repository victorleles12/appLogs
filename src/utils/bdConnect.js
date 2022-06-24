const { Client } = require('pg');
require('dotenv').config()

function configConnection(){
    
    const client = new Client({
        connectionString        : process.env.DATABASE_URL, ssl: {rejectUnauthorized: false}
        // USER: process.env.USER,
        // HOST: process.env.HOST,
        // DATABASE: process.env.DATABASE,
        // PASSWORD: process.env.PASSWORD,
        // PORTA: process.env.PORTA,
    });

    return client
}
    
module.exports = configConnection