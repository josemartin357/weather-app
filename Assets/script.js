// Variables
var button = document.querySelector('.searchButton')
var inputValue = document.querySelector('.searchInput')

var cityValue = document.querySelector('.city')
var tempValue = document.querySelector('.temp')
var humidValue = document.querySelector('.humidity')
var descValue = document.querySelector('.desc')
var windValue = document.querySelector('.wind')
var uvIndexValue = document.querySelector('.uvIndex')


// event listener
button.addEventListener('click', function() {
    // fetching for current conditions box
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=264c2c2a11ab2c52afc3fad17ab64fe1'+"&units=imperial")
    .then(response => response.json())

    .then(response => {
        var city = response['name'];
        var temp = response['main']['temp']
        var humid = response['main']['humidity']
        var desc = response['weather'][0]['description'];
        var wind = response['wind']['speed']
        // var uv = response.current.uvi


        cityValue.innerHTML = "City: "+city;
        tempValue.innerHTML = "Temperature: "+temp;
        humidValue.innerHTML = "Humidity: "+humid;
        descValue.innerHTML = "Conditions: "+desc;
        windValue.innerHTML = "Wind Speed: "+wind;
        // uvIndexValue.innerHTML = "UV Index: "+uv;

    console.log(response)
    })

    //  // fetching for 5-day forecast box
    //  fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=264c2c2a11ab2c52afc3fad17ab64fe1'+"&units=imperial")
    //  .then(response => response.json())
 
    //  .then(response => {
    //      var city = response['name'];
    //      var temp = response['main']['temp']
    //      var desc = response['weather'][0]['description'];
 
    //      cityValue.innerHTML = "City: "+city;
    //      tempValue.innerHTML = "Temperature: "+temp;
    //      descValue.innerHTML = "Conditions: "+desc;
    //  console.log(response)
    //  })



// .catch(err => alert("Wrong city name"))
})

// Your Task
// Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.
// Use the OpenWeather One Call API to retrieve weather data for cities. Read through the documentation for setup and usage instructions. You will use localStorage to store any persistent data. For more information on how to work with the OpenWeather API, refer to the Full-Stack Blog on how to use API keys.

// AS A traveler ...I WANT to see the weather outlook for multiple citie SO THAT I can plan a trip accordingly

// ACCEPTANCE: GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
