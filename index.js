// Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const session = require("express-session");
const cntFlash = require("connect-flash");


const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./user/UserController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/User");
// View engine
app.set('view engine','ejs');

// Section ativate


app.use(session({
    secret: "qualquercoisa", cookie: { maxAge:  }
}));



// Static
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());
//---------------------//
// Database connection

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão realizada com sucesso!");
    }).catch((error) => {
        console.log(error);
    })
//------------------//
// imports controllers  src : articles/ Articles Controlls and src: categories/ CategoriesControlers
// import the controlers to control Articles and Categories pages and set this vars. 
app.use("/" , categoriesController);
app.use("/" , articlesController);
app.use("/" , usersController);
// --------------------//
// Route to homepage fron aplication
// Description: Show in homepage the articles using the Id of thems from database and render his order by of more recent. 
app.get("/", (req,res) =>{
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles =>{
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        })
    })
});
//-------------------//

// Route from create the Articles page conform slug selected in homepage
app.get("/:slug",(req, res) =>{
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            })
        }else{
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
});
// --------------------------//

// Filter the articles from your category from navbar of header
app.get("/category/:slug", (req, res) =>{
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then (category => {
        if (category != undefined) {
            Category.findAll().then(categories =>{
                res.render("index", {articles: category.articles, categories: categories});
            })
        } else {
            res.redirect("/");
        }
    }).catch (err => {
        res.redirect("/");
    })
})
// -----------------------//

// Start the serve on port 8080
app.listen(8080,() =>{
    console.log("O servidor está funcionando! ")
})
