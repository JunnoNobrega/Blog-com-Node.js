// This module create all routes to page Articles , used for create , delete and edit thems.

// Imports
const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

// Route from page Articles adminitrator homepage / Frontend ref:  views/articles/index
router.get("/admin/articles", adminAuth, (req,res)=> {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles =>{
        res.render("admin/articles/index", {articles: articles}); 
    });
});
//------------------------------//

// Route from create new article //  Frontend ref:  views/articles/new
router.get("/admin/articles/new",adminAuth, (req,res) =>{
    Category.findAll().then(categories =>{
        res.render("admin/articles/new", {categories: categories})
    })
});
//------------------------------------//

// -- Route for save the new article create on page new article //  
router.post("/articles/save",(req,res) =>{
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

   Article.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: category
   }).then(()=> {
        res.redirect("/admin/articles")
   })
})
// ------------------------------------------//

// Route for Delete article on index of articles
router.post("/articles/delete", (req,res) =>{
    var id =req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id:id
                }
            }).then(()=>{
                res.redirect("/admin/articles");
                
            })
        }else{ //Não for um número
            res.redirect("/admin/articles")
        }
    }else { // Null
        res.redirect("/admin/articles")
    }
});
// Route for edit article 
router.get("/admin/articles/edit/:id",(req,res)=>{
    var id = req.params.id;
    Article.findByPk(id).then(article =>{
        if (article != undefined) {
            Category.findAll().then(categories =>{
                res.render("admin/articles/edit", {categories: categories, article: article})
            })
        } else {
                res.redirect("/admin/articles");
        }
    }).catch(err => {
        res.redirect("/admin/articles")
    });
});
//----------------------------------------------------//

// Route for save edited article on data base
router.post("/articles/update", (req, res) =>{
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category

    Article.update({title: title, body: body,categoryId: category, slug:slugify(title)}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(err =>{
        res.redirect("/")
    });
});
//-----------------------------------------------//

// Route to article page 
router.get("/articles/page/:num", (req,res) =>{
    var page = req.params.num;

    if(isNaN(page) || page == 1){
        offset = 0
    }else{
        offset = (parseInt(page)-1)*4;
    }
    Article.findAndCountAll({
        limit: 4,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles =>{

        var next;
        if(offset + 4 >= articles.count){
            next = false;
        }else {
            next = true;
        }
        var result = {
            page: parseInt(page),
            next: next,
            articles : articles
        }
        Category.findAll().then(categories =>{
            res.render("admin/articles/page", {result:result, categories: categories})
        })
       console.log(result);
    })
})
//-----------------------------------------------//


// Exporte o module router. 
module.exports = router;