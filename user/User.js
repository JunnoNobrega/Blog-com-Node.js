// This module create connection on data base and create the users. 

// Imports
const Sequelize = require("sequelize");
const connection = require("../database/database");

// Create a connection with database and create uses. 
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

//User.sync({force:true}); -- activate on first use to be created in database.

// exporte module User 
module.exports = User;