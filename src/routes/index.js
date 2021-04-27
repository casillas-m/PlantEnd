const router = require('express').Router();
// const handlebars  = require('express-handlebars');

router.route("/").get((req,res)=>{
    res.render("index")   
})

router.route("/signin").get((req,res)=>{
    res.render("signin",{layout:"mainlogin.handlebars"})   
})

router.route("/signup").get((req,res)=>{
    res.render("signup",{layout:"mainlogin.handlebars"})   
})

module.exports = router;