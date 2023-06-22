// This page create connection on data base and create the table Categories in database

// Imports
const Sequelize = require("sequelize");
const connection = require("../database/database");

// Create a connection with database and create the table categories in them
const User = connection.define('uses', {
    email: {
        type: Sequelize.STRING,
        allowNull: false, 
    },password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
// ---------------------//

//User.sync({force:true});

// exporte module User 
module.exports = User;