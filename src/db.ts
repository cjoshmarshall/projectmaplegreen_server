import path from "path";
const mysql = require('mysql')
const dotenv = require('dotenv')


dotenv.config({ path: path.resolve(__dirname + '/.env') });

export const db = mysql.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
})

