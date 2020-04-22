console.log('JAVASCRIPT')

const getWeather = (location, cb) => {
    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`).then((response) => {
        response.json().then(data => {
            if(data.error) {
                console.log(data.error)
                cb(data.error)
            } else {
                cb(undefined, data)
                console.log(data)
            }
        })
    })
}



const weatherForm = document.querySelector('form')
const search = weatherForm.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    p1.textContent = 'Loading data...'
    p2.textContent = ''
    const location = search.value
    getWeather(location, (error, data) => {
        p1.textContent = ''
        if(error) {
            p2.textContent = error
        } else {
            p2.textContent = `Location: ${data.location}. Forecast: ${data.forecastData}`
        }
    })

})