const router = require('express').Router();
const jwt = require("jsonwebtoken")
const request = require('request');
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

let auth = (req, res, next) => { //Verificar existencia de token
    if (req.cookies.token) next();
    else res.redirect('/signin')
}

router.route("/").get((req, res) => {
    res.render("index", { footer })
})

router.route("/signin").get((req, res) => {
    res.render("signin", { layout: "mainlogin.handlebars", URL_BACK })
})

router.route("/signup").get((req, res) => {
    res.render("signup", { layout: "mainlogin.handlebars", URL_BACK })
})

router.route("/myplants").get(auth, (req, res) => {
    const options = {
        method: 'GET',
        url: URL_BACK + "/myplants",
        qs: { token: req.cookies.token }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let plants = JSON.parse(body)
        plants.forEach(o => {
            if(o.light_needed>80000)o.light="Strong direct sunlight"
            else if(o.light_needed>32000)o.light="Direct sunlight"
            else if(o.light_needed>10000)o.light="Daylight, not direct sun"
            else o.light="Interior"

            //1-10
            if(o.hum_needed>8)o.hum_needed_text="Subaquatic"
            else if(o.hum_needed>6)o.hum_needed_text="Water loving"
            else if(o.hum_needed>4)o.hum_needed_text="Dry loving"
            else o.hum_needed_text="Xerophytic"

            if(o.hum_needed>8)o.freq_text = "(if not submerged)"
            else o.freq_text = ""

            let soil_factor;
            if(o.soil=="Peat Soil")soil_factor=1
            else if(o.soil=="Silt Soil")soil_factor=1.2
            else if(o.soil=="Clay Soil")soil_factor=1.6
            else soil_factor=2 //Sandy

            o.freq = (soil_factor*o.hum_needed*(1/5)*o.light_needed*(1.4/100000)).toFixed(2)
        });
        res.render("myplants", { URL_BACK: process.env.URL_BACK, plants, footer })
    });
})

router.route("/addplant").get(auth,(req, res) => {
    res.render("addplant", { URL_BACK, footer })
})

module.exports = router;