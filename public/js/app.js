const weatherForm=document.querySelector("form");
const search=document.querySelector("input");
const messageOne=document.querySelector("#message-1");
const messageTwo=document.querySelector("#message-2");

// messageOne.textContent= "From javascript";

weatherForm.addEventListener("submit",(e)=> {
    e.preventDefault();
    const location=search.value;
    //console.log(location);
    messageOne.textContent= "Loading";
    messageTwo.textContent= "";
    const address="http://localhost:3000/weather?address="+location;
    fetch(address).then((response)=>{

    response.json().then((data)=> {
        if(data.error) {
            messageOne.textContent= data.error;
        }
        else {

            messageOne.textContent= data.location;
            messageTwo.textContent= data.forecastData;
        }
    })
})

})