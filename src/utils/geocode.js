const request = require ('postman-request')

// we used destructuring to get body from the response object and removed response wherever it wuld have been 
// needed in case of no destructuring

const geocode = (address,callback) =>
{const geocodeurl = 
`http://api.positionstack.com/v1/forward?access_key=4d8b7102b2f95279c8d843440e6e9f71&query=${encodeURIComponent(address)}&limit=1`

request({ url: geocodeurl,
         json: true
        },
        (error,{body}={}) => {
        if (error) {
            callback('unable to connect to the weather app', undefined)  
        } 
        else if (body.data.length === 0)
        {callback ('Please specify a valid query', undefined)
        }   
       else {
            callback(undefined, { 
            latitude : body.data[0].latitude,
            longitude: body.data[0].longitude,
            location: body.data[0].label   
           }) 
        }
        }
    )
}

module.exports = geocode