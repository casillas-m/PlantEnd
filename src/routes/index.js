const router = require('express').Router();
// const handlebars  = require('express-handlebars');

router.route("/").get((req,res)=>{
    res.render("index")   
})

module.exports = router;