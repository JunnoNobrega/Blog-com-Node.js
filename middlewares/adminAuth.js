const session = require("express-session");


function adminAuth (req, res, next){
    
    if(req.session.user != undefined){
        next();
    }else {
        const errorMessage = 'Acesso negado! Faça login e tente novamente!!!';
        res.send('<script>alert("' + errorMessage + '"); window.location.href = "/login";</script>');
     
    }
}

module.exports = adminAuth; 