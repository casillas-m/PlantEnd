const router = require('express').Router();
// const handlebars  = require('express-handlebars');

router.route("/").get((req,res)=>{
    res.render("index")   
})

router.route("/login").get((req,res)=>{
    res.render("login",{layout:"mainlogin.handlebars"})   
})

module.exports = router;