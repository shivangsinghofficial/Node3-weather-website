const request=require("request");
const geocode= (address,callback)=> {
    const url1="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2hpdmFuZzE5IiwiYSI6ImNrampqeWg2MjFrbHIyem83YTc0bnE3amUifQ.GGCs1-zNv97TTD1Y7Pt_3w&limit=1";
    
    request({url:url1,json:true},(error,{body})=> {
        if(error) {
            callback("Unable to connect to location services",undefined);
        }
        else if(body.features.length===0) {
            callback("Unable to find location. Try another search",undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode;

// geocode('Philadelphia',(error,data)=> {
//     console.log("Error",error);
//     console.log("Data",data);
// })