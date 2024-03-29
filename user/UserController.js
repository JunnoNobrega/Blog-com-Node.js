// This module create the page of administrator for Users.

const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");

// Route for get all users on database.
router.get("/admin/users", (req, res) =>{
    User.findAll().then(users =>{
        res.render("admin/users/index", {users: users});
    }).catch((err) =>{
        res.redirect("/");
});
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
})

// Route for create new user on data base. Front-end ref : uesers/index.ejs
router.post("/users/create", adminAuth, (req,res) =>{
    var email = req.body.email;
    var password = req.body.password;


    User.findOne({where:{email: email}}).then(user =>{
        if (user == undefined) {
            
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
        
            User.create({
                email:email,
                password: hash
            }).then(()=>{
                res.redirect("/admin/users");
            }).catch((err) =>{
                    res.redirect("/");
            });
        } else {
            res.redirect("/admin/users/create");
        }
    })
});

router.get("/login", (req,res) =>{
    res.render("admin/users/login");
});
// Route for Login in admin page // Front-end ref: Login.ejs
router.post("/authenticate", (req,res)=> {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email:email}}).then(user =>{
        if (user != undefined) {
            //valida senha
            var correct = bcrypt.compareSync(password,user.password);

            if (correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles");
            } else {
                res.redirect("/login"); 
            }
        } else {
            res.redirect("/login");            
        }
    });
});

router.get("/logout", (req, res) =>{
    req.session.user = undefined;
    res.redirect("/");
})

// Route for delete users
router.post("/users/delete", adminAuth, (req,res) =>{
    var id =req.body.id;
    if(id != undefined){
        if(id !== undefined && !isNaN(id)){
            User.destroy({
                where: {
                    id:id
                }
            }).then(()=>{
                res.redirect("/admin/users");
            }).catch(err => {
                console.log(err);
                res.redirect("/admin/users");
            })
        }else{ //is not number
            res.redirect("/admin/users")
        }
    }else { // Null
        res.redirect("/admin/users")
    }
});
// Route for edit users
router.get("/admin/users/edit/:id", adminAuth, (req,res)=>{
    var id = req.params.id;
    User.findByPk(id).then( user =>{
        if(user != undefined){
            res.render("admin/users/edit", {user : user});
        } else {
            res.redirect("/admin/users");
        }
    }).catch(err =>{
        res.redirect("/admin/users");
    })
});

// Route for save edited user on data base
router.post("/users/update", adminAuth,(req,res)=>{
    var id = req.body.id;
    var email = req.body.email;

    User.update({email: email, id: id}, {
        where: {
            id: id
        }
    }).then(()=> {
        res.redirect("/admin/users");
    }).catch(err => {
        console.log(err);
    });

});

//Export Module router

module.exports = router; 
