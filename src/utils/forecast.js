const request= require("request")
const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=c22d7c66e85215937c23a197197d8d60&query="+latitude+","+longitude+"&units=m ";
    request( {url:url,json:true},(error,{body})=> {
        if(error) {
            callback("Unable to connect to location services",undefined)
        }
        else if(body.error) {
            callback("Unable to find location. Try another search",undefined)
        }
        else {
            const weather=body.current.weather_descriptions[0]+"- Temperature is "+body.current.temperature+" deg C, and it feels like "+ body.current.feelslike+" deg C. Humiity is " + body.current.humidity+".";
            callback(undefined, weather)
        }
    })
}

module.exports=forecast;