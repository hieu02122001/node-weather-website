const path = require('path'); //The default location of views í 'views' folder
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
const hbs = require('hbs')

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');// dir to public folder
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // point express to custom directory
hbs.registerPartials(partialsPath);

// Setup static dir to server
app.use(express.static(publicDirPath));// app.use() - It's the way to customize the server
// This will point to index.html (has a special name) and choose it to be the root route

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'HieuZ'
    }); //match up with the name in views 
    //render one of our view
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'HieuZ'
    })
})
// An about route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'HieuZ'
    });
})
// A weather route
app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        // This code block only run when 'address' is provided
        return res.send({
            // return to make sure this func stop when use res.send
            error: 'You must provide the address!'
        })
    }
    geocode(address, (error, {lat: latitude, lon: longitude, location} = {}) => {// = {} is a default value if the geocode is false and it return nothing
        if (error) {
            return res.send({
                error,
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error,
                })
            }
            return res.send({
                forecast: forecastData,
                location,
                address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        // This code block only run when 'search' is provided
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query);
    res.send({
        prduct: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 error',
        message: 'Help article not found!',
        name: 'HieuZ'
    })
})

// 404 not found
// This route handler have to be the last route handler
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error',
        message: 'Page not found!',
        name: 'HieuZ'
    })
})

app.listen(3000, () => {
    console.log("The server is running on port 3000.");
})