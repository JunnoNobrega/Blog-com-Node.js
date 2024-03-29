// This module create connection on data base and create the table Categories in database

// Imports
const Sequelize = require("sequelize");
const connection = require("../database/database");

// Create a connection with database and create the table categories in them
const Category = connection.define('categories', {
    title:  {
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
// ---------------------//

//Create.sync({force:true});  --- activate on first use to be created in database.

// exporte module Category 
module.exports = Category;