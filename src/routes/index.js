const router = require('express').Router();
require('dotenv').config();
// const handlebars  = require('express-handlebars');

let footer = `
<!-- Footer -->
    <footer id="footer">
        <div class="inner">
            <ul class="icons">
                <li><a href="https://github.com/casillas-m/PlantEnd" class="icon brands alt fa-github"><span class="label">GitHub</span></a></li>
                <li><a href="https://www.linkedin.com/in/mart%C3%ADn-casillas-534327bb/" class="icon brands alt fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
                <li><a href="https://www.linkedin.com/in/michel-maris-mora-76471b157/" class="icon brands alt fa-linkedin-in"><span class="label">LinkedIn</span></a></li>
            </ul>
            <ul class="copyright">
                <li>PlantEnd</li>
                <li>Design template: <a href="https://html5up.net">HTML5 UP</a></li>
            </ul>
        </div>
    </footer>
`
let URL_BACK = process.env.URL_BACK

router.route("/").get((req, res) => {
    res.render("index",{footer})
})

router.route("/signin").get((req, res) => {
    res.render("signin", { layout: "mainlogin.handlebars", URL_BACK})
})

router.route("/signup").get((req, res) => {
    res.render("signup", { layout: "mainlogin.handlebars", URL_BACK})
})

router.route("/myplants").get((req, res) => {
    let example = {plant_name:"Arbol",img_url:"https://www.tiposde.com/wp-content/uploads/Tipos-de-pinos.-450x600.jpg",hum_needed:"1",light_needed:"12"}
    res.render("myplants", { URL_BACK: process.env.URL_BACK, plants:[example,example,example],footer })
})

module.exports = router;