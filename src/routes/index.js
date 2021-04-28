const router = require('express').Router();
require('dotenv').config();
// const handlebars  = require('express-handlebars');

router.route("/").get((req,res)=>{
    res.render("index")   
})

router.route("/signin").get((req,res)=>{
    res.render("signin",{layout:"mainlogin.handlebars",URL_BACK:process.env.URL_BACK})   
})

router.route("/signup").get((req,res)=>{
    res.render("signup",{layout:"mainlogin.handlebars",URL_BACK:process.env.URL_BACK})   
})

module.exports = router;