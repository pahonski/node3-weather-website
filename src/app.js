const path = require('path')
const express = require('express')
const hbs = require('hbs')

//utils
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

//views setup
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

//General setup for static pages
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pavel Dmitrievich'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Pavel Dmitrievich'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is my help message',
        name: 'Pavel Dmitrievich'
    })
})

// app.get('', (req, res) => {
//     res.send('Hello express!')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page!')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page!</h1>')
// })

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must set the address!'
        })
    }

    const address = req.query.address

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error) return res.send({
            error
        })

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) return res.send({error})

            res.send({
                location,
                forecastData,
                address
            })
        })


    })

    // res.send({
    //     location: address,
    //     forecast: '12 degree'
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Pavel Dmitrievich'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Pavel Dmitrievich'
    })
})


app.listen('3000', () => {
    console.log('server up on port 3000')
})