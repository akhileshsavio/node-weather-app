const request = require ('postman-request')

// we used destructuring to get body from the response object and removed response wherever it wuld have been 
// needed in case of no destructuring

const forecast = (latitude,longitude,callback) => {
 const weatherurl = 
 `http://api.weatherstack.com/current?access_key=db36ccca9ea7cc4b8d47c51bfbfce830&query=${latitude},${longitude}`;

 request(
        { url: weatherurl,
          json: true
        }, (error, {body}={}) => 
        { 
            if (error) {
                callback ('unable to connect to the weather app', undefined)
            } else if (body.error)
            {
                callback ('Please specify a valid query', undefined)
            }   else
            {   callback(undefined, 
                `The weather is ${body.current.weather_descriptions[0]} and it is currently ${body.current.temperature} degrees outside but it feels like ${body.current.feelslike}.`
                )
            }
        }  
    )
}

module.exports = forecast