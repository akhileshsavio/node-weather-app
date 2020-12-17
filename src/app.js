const path1 = require('path')
const express = require('express')
const app = express()
const hbs = require ('hbs')
const request = require ('postman-request')
const forecast = require ('./utils/forecast')
const geocode = require ('./utils/geocode')

// Define paths for Express config
const publicDirectoryPath = path1.join(__dirname, '../public')
const viewsPath = path1.join(__dirname, '../templates/views')
const partialsPath = path1.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nobody'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nobody'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name:'Nobody'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send ({
        error : 'please provide an address'
     })
    } else {
        geocode (req.query.address, (error,{latitude, longitude, location}={})=>{
            if (error) {
               res.send({error}) 
            }
           else{
             forecast (latitude, longitude, (error,forecastData)=>{
                if(error) {
                   res.send({error})
                } 
                else {
                    res.send (
                        {location,
                        forecast:forecastData}
                    )   
                }
            })
           }   
        })
    }  
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        message : 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        message : `Sorry, the page you're looking for doesn't exist. 
        If you think something is broken, report a problem.`
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})