// This module create the page of administrator for categories

// Imports
const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");


// Route for create new category // Frontend ref: view/categories/new
router.get("/admin/categories/new", (req,res)=> {
    res.render("admin/categories/new");
});
// --------------------------//

// Route for save the category create on database 
router.post("/categories/save", (req, res) =>{
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories");
        })

    }else{
        res.redirect("/admin/categories/new");
    }
});
// ---------------------------------------// 

// Route for Homepage of categories adminsitrator // Frontend ref: view/categories/index.ejs
router.get("/admin/categories", (req,res) =>{
    Category.findAll().then(categories =>{
        res.render("admin/categories/index",{categories: categories});
    });
});
//------------------------------//

// Route for delete a Category // this no have frontend ref but the funtion delete onle remove from database no have page render. 
router.post("/categories/delete", (req,res) =>{
    var id =req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id:id
                }
            }).then(()=>{
                res.redirect("/admin/categories");
                
            })
        }else{ //Is not a number
            res.redirect("/admin/categories")
        }
    }else { // Null
        res.redirect("/admin/categories")
    }
});
// ---------------------------------//

// Route for Edit a selected category  // Frontend ref: view/categories/edit
router.get("/admin/categories/edit/:id", (req,res)=> {
    var id = req.params.id;
    if (isNaN(id)){
        res.redirect("/admin/categories");
    }else{
            Category.findByPk(id).then(category => {
            if(category != undefined){
                res.render("admin/categories/edit", {category: category});
            }else{
                res.redirect("/admin/categories");
            }
        }).catch(erro =>{
            res.redirect("/admin/categories");
        })
    }
});
// --------------------------------------------//

// Route for save edited category on data base
router.post("/categories/update",(req,res)=>{
    var id = req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title)}, {
        where: {
            id: id
        }
    }).then(()=> {
        res.redirect("/admin/categories");
    }).catch(err => {
        console.log(err);
    });

});
//-----------------------------------------------//

//Export Module router
module.exports = router;

