// This module create a connection whith the database or server.

// Imports
const Sequelize = require("sequelize");

// Create a connection using Sequelize
const connection = new Sequelize('guiapress', 'root','Admin@2023',{
    host: 'localhost',
    dialect: 'mysql', 
    timezone: "-03:00"
});
//-----------------------------------------//

//Export module connection
module.exports = connection;
