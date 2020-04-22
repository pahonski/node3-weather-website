const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dae915bed1d24c1e7b55b07c1cf78db8&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `Current temperature is ${body.current.temperature}`)
            // console.log(response.body)
            // console.log(`Current temperature is ${response.body.current.temperature}`)
        }

    })

}

module.exports = forecast