const location_input = document.querySelector(".location-container");
const location_button = document.querySelector(".submit");
let api;
const city = "Kolkata"
const api_key = "ee1e7ca3c60d370a5f3c0300cffcb78f"
function locationHandler() {
    if(navigator.geolocation)
        loc = navigator.geolocation.getCurrentPosition(onSuccess, onError);
    else
        console.log('Geolocation is not present');
}

function onSuccess(position){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
    fetch(api).then(response => response.json()).then(result => console.log(result))

    const {latitude, longitude} = position.coords;
    console.log(latitude, longitude, position.coords);
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}


    location_button.addEventListener("click", locationHandler);
