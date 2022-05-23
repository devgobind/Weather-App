const location_input = document.querySelector(".location-text");
const location_button = document.querySelector(".submit");
const _weather = document.querySelector(".weather-container");
const _image = document.getElementById("sky_img")
const weather_container = document.querySelector(".weather-container");
const div = document.querySelector(".details-container");
//Enter API Key
const api_key = YOUR_API_KEY';
function locationHandler() {
    if(navigator.geolocation)
        loc = navigator.geolocation.getCurrentPosition(location_weather);
    else
        console.log('Geolocation is not present');
}

function location_weather(position){
    const {latitude, longitude} = position.coords;
    fetchCurrentLocationWeather(latitude, longitude);
}

function fetchCurrentLocationWeather(lat, lon){
    api =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
    fetchData(api);
}

function weather(description, temp){
    let p = document.createElement("p");
    desc = document.createTextNode(description.toUpperCase());
    p.append(desc);
    console.log(p);
    div.appendChild(p);
    const temperature = document.createElement("h5");
    const _temp = document.createTextNode(`${Math.ceil(temp)}°C`);
    temperature.append(_temp)
    div.append(temperature)
    weather_container.append(div)
}

function fetchCityData(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
    fetchData(api);
}

function fetchData(api){
    fetch(api).then(response => response.json()).then(result => {
        console.log(result)
        const {id, description} = result.weather[0];
        const{temp} = result.main;
        div.innerHTML = ''
        weather(description, temp);
        sky_condition(id);
        if(_weather.classList.contains("hide")){
            _weather.classList.toggle("hide");
        }

    })
}


function sky_condition (id){
    if(id == 800){
        _sky = "01d"
    }else if(id >= 200 && id <= 232){
        _sky = "11d" 
    }else if((id >= 300 && id <= 321)){
        _sky = "09d"
    }
    else if((id >= 500 && id <= 531)){
        _sky = "10d"
    }
    else if(id >= 600 && id <= 622){
        _sky = "13d"
    }else if(id >= 701 && id <= 781){
        _sky = "50d"
    }else if(id >= 801 && id <= 804){
        _sky = "04d"
    }
    _image.src = `http://openweathermap.org/img/wn/${_sky}@2x.png`;
}

   location_button.addEventListener("click", locationHandler);
   location_input.addEventListener("keyup", event => {
       if(event.keyCode ===13){
           fetchCityData(location_input.value)
       }})
