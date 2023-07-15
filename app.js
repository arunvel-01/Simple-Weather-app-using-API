const express = require("express");
const https =require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

    app.post("/", function(req,res){
        
    const query = req.body.cityName;
    const apiKey = "e29fb586a085d9274a8041943360508e";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit; 

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);

            const feelsLike = weatherData.main.feels_like;
            console.log(feelsLike);

            const description = weatherData.weather[0].description;
            console.log(description);

           const icon = weatherData.weather[0].icon;
           const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
           console.log(icon);



            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
            res.write("<h2>The feels like is " + feelsLike + " </h2 \n");
            res.write("<p>The weather is currently " + description + ".</p>");
            res.write("<img src= " + imageURL +">");
            res.send();
        });
     });
});


app.listen(3000 , function(){
    console.log("Server is running on port 3000.");
});