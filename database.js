require("dotenv").config();
let mysql = require('mysql2/promise');

async function databaseInitialization(){
    try{
        const con = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER_NAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            port: process.env.DATABASE_PORT
        });
        console.log("Connected!");
        // create user table because card table has user id as a foreign key
        const createUserTableQuery = "CREATE TABLE users(id int NOT NULL AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255), address VARCHAR(255), PRIMARY KEY (id))";
        try{
            await con.query(createUserTableQuery)

            // insert dummy user to add the card successfully
            const insertDummyUser = "INSERT INTO users(username, password, email, address) values('testUser', 'testPassword', 'testemail@gamil.com', 'street9')"
            await con.query(insertDummyUser)
        }
        catch(e1){
            console.log("users table already exists")
        }

        // create card table
        const createCardTableQuery = "CREATE TABLE cards(id int NOT NULL AUTO_INCREMENT, card_number VARCHAR(255), cvv VARCHAR(255), card_holder_name VARCHAR(255), expiration_date DATE, user_id INT, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id))";
        try{
            await con.query(createCardTableQuery)    
        }
        catch(e1){
            console.log("cards table already exists")
        }
        return con
    }
    catch(ex){
        throw ex
    }
}

module.exports = {databaseInitialization}
