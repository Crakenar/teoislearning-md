import dotenv from "dotenv"
import mysql from "mysql"
dotenv.config();


export default async function initDB(){
    let db;
    function handleDisconnect() {
         db = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DB
        });                                     // the old one cannot be reused.

        db.connect(function(err) {              // The server is either down
            if(err) {                                     // or restarting (takes a while sometimes).
                console.log('error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
            }                                     // to avoid a hot loop, and to allow our node script to
        });
        db.query('select 1 + 1', (err, rows) => { /* */ });
        // process asynchronous requests in the meantime.
                                                // If you're also serving http, display a 503 error.
        db.on('error', function(err) {
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                handleDisconnect();                         // lost due to either server restart, or a
            } else {                                      // connnection idle timeout (the wait_timeout
                throw err;                                  // server variable configures this)
            }
        });
    }

    handleDisconnect();
    return db;
}