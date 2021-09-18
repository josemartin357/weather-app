// Variables
// var city="";
var button = document.querySelector('.searchButton')
var inputValue = document.querySelector('.searchInput')

var cityValue = document.querySelector('.city')
var tempValue = document.querySelector('.temp')
var humidValue = document.querySelector('.humidity')
var descValue = document.querySelector('.desc')
var windValue = document.querySelector('.wind')
var uvIndexValue = document.querySelector('.uvIndex')
// variables to select 5-day forecast box and current weather box
var fiveDayBox = document.querySelector('.fiveDayBox')
var currentBox = document.querySelector('.currentBox')

// event listener
button.addEventListener('click', function() {
    // fetching for current conditions box
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=264c2c2a11ab2c52afc3fad17ab64fe1'+"&units=imperial")
    .then(response => response.json())
    .then(response => {
        var city = response.name;
        var temp = response.main.temp;
        var humid = response.main.humidity;
        var wind = response.wind.speed;
        var date = moment.unix(response.dt).format("MM/DD/YYYY")

        // editing inner html with desired info from api
        cityValue.innerHTML = "The weather in "+city+" on "+ date;
        tempValue.innerHTML = "Temperature: "+temp+"°F";
        humidValue.innerHTML = "Humidity: "+humid+" %";
        windValue.innerHTML = "Wind Speed: "+wind+" MPH";
        getUvi(response.coord.lat, response.coord.lon)

        //icon property.
        var weathericon= response.weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        $(descValue).html("<img src="+iconurl+">");

        // showing five day weather box and current weather box after click
        fiveDayBox.style.display="block";
        currentBox.style.display="block";
    })
})


function getUvi(lat, lon){
    var getUviUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon +"&exclude=minutely,hourly,alerts&appid=264c2c2a11ab2c52afc3fad17ab64fe1"+"&units=imperial"
    fetch(getUviUrl)
    .then(response => response.json())

    .then(response => {
    // console.log(response)
    uvIndexValue.innerHTML = "UVI Index: "+response.current.uvi;

    // console.log(response.daily)
    Fivedayforecast(response.daily)


    // setting local storage
    // var formValue = $(".searchInput").val();
    // sCity=JSON.parse(localStorage.getItem("city"));
    // console.log(sCity);
    // localStorage.setItem("city", JSON.stringify(sCity));  
    // // console.log(localStorage.getItem(formValue));
    // var sCity = JSON.parse(localStorage.getItem("city"));
    // addToList(city);
    })
}



function Fivedayforecast(fiveDay){
    // console.log(fiveDay)
     var getFiveUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=264c2c2a11ab2c52afc3fad17ab64fe1'+"&units=imperial"
    $.ajax({
        url:getFiveUrl,
        method:"GET"
    })
    .then(function(response){

    for (let i=1; i < 6; i++) {
        // console.log("this is day",fiveDay[i])
        var day = moment.unix(fiveDay[i].dt).format("MM/DD/YYYY")
        var temp = "Temp: "+response.list[i+1].main.temp;
        var wind ="Winds: "+ response.list[i+1].wind.speed;
        var humidity ="Humidity: "+response.list[i+1].main.humidity;
        // /icon property.
        var weathericon= response.list[i+1].weather[0].icon;
        var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
        
   
        // editing inner html with desired info from api
        $("#day-"+i).html(day);
        $("#desc-"+i).html("<img src="+iconurl+">");
        $("#temp-"+i).html(temp+"°F");
        $("#wind-"+i).html(wind+" MPH");
        $("#humidity-"+i).html(humidity+" %");

    }
    })
}


// Forloop for persisting the data onto HMTL page
// for (var i = 0; i < localStorage.length; i++) {
//     var city = JSON.parse(localStorage.getItem("city"));
//     // console.log(localStorage.getItem("City"));
//     // var cityName = $(".list-group").addClass("list-group-item");
//     // cityName.append("<li>" + city + "</li>");
//     addToList(city);
// }


//Daynamically add the passed city on the search history
// function addToList(c){
//     var listEl= $("<li>"+c.toUpperCase()+"</li>");
//     $(listEl).attr("class","list-group-item");
//     $(listEl).attr("data-value",c.toUpperCase());
//     $(".list-group").append(listEl);
// }

