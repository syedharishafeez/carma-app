const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require('./routes');
const con = require('./database')
const port = process.env.PORT | 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

let dbCon = con.databaseInitialization()
console.log("Hi")
app.use('/card', async (req, res, next) => {
    if(!dbCon || !dbCon.query){
      dbCon = await con.databaseInitialization()
    }
    req.dbCon = dbCon; // adding database connection instance in a request, s that we can use it in route
    next();
}, routes);

app.listen(port, function() {
  console.log(`App is listening on port ${port}!`)
});