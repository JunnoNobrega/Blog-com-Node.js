// Imports
const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

// Create on database the table articles//
const Article = connection.define('articles', {
    title:  {
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }    
})
Category.hasMany(Article); // Tem muitos
Article.belongsTo(Category); // Um artigo pertence a uma categoria


// export the module Articles
module.exports = Article;