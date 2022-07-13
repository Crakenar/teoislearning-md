import dotenv from "dotenv"
import mysql from "mysql"
dotenv.config();


export default function initDB(){
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DB
    });
    db.connect((err) => {
        if (err){
            console.log(err)
        }else {
            console.log('connected to mysql')
        }
    });
    return db;
}