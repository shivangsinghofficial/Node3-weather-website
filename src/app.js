const geocode=require("./utils/geocode");
const forecast=require("./utils/forecast");
const path=require('path');
const express=require('express');
const hbs=require('hbs')
// console.log(path.join(__dirname,"../public"));
const app=express();
const port=process.env.PORT || 3000;
// Define paths for express config
const publicDir=path.join(__dirname,"../public");
const viewPath=path.join(__dirname,"/templates/views");
const partialPath=path.join(__dirname,"/templates/partials");

// setuo handlebars enine and views location
app.set("view engine", "hbs")
app.set("views",viewPath);
hbs.registerPartials(partialPath)



//Setup static directory to serve
app.use(express.static(publicDir));

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather",
        name: "Shivang Singh"
    });
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title:"About Me",
        name: "Shivang Singh"
    });
})

app.get('/help',(req,res)=> {
    res.render('help',{
        helpText:"Help page",
        title: "Help",
        name: "Shivang Singh"
    });
})



app.get("/weather",(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error: "You must provide a location"
        })
    }
    const loc=req.query.address;
    geocode(loc,(error,{latitude,longitude,location}={})=> {
        if(error) {
            return  res.send( {
                error
            })
        }
        forecast(latitude,longitude, (error,forecastData)=> {
            if(error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecastData: forecastData,
                location,
                address: req.query.address

            })
        })
    })
    
})

app.get("/products",(req,res)=>{
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        products:[]
    })
})

app.get("/help/*",(req,res)=> { 
    res.render('404',{
        title:"404 error",
        page: "Help page",
        name:"Shivang Singh"
    })

})

app.get("*",(req,res)=> { 
    res.render('404',{
        title:"404 error",
        page: "page", 
        name:"Shivang Singh"
    })
    
})
// app.com
// app.com/help
// app.com/about

app.listen(port,()=> {
    console.log("Server is up on port "+port);
});