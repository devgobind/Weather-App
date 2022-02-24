const location_input = document.querySelector(".location-text");
const location_button = document.querySelector(".submit");
const _weather = document.querySelector(".weather-container");
const _image = document.getElementById("sky_img")
let api;
//Enter API Key
const api_key = "ee1e7ca3c60d370a5f3c0300cffcb78f"
function locationHandler() {
    if(navigator.geolocation)
        loc = navigator.geolocation.getCurrentPosition(weather);
    else
        console.log('Geolocation is not present');
}

function weather(position, city){
    city = location_input.value;
    _sky = "10d";
    console.log(city);
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
    fetch(api).then(response => response.json()).then(result => {
        const {id} = result.weather[0];
        console.log(id);
        _image.src = `http://openweathermap.org/img/wn/${_sky}@2x.png`;
        console.log(result.weather);
    })
    if(_weather.classList.contains("hide")){
        _weather.classList.toggle("hide");
    }
    const {latitude, longitude} = position.coords;
    console.log(latitude, longitude, position.coords);
}

   location_button.addEventListener("click", locationHandler);
