 document.addEventListener('DOMContentLoaded',()=>{
   const cityInput =document.getElementById("city-input");
   const getWeatherBtn =document.getElementById("get-weather-btn");
   const weatherInfo =document.getElementById("weather-info");
   const cityNameDisplay =document.getElementById("city-name");
   const temperatureDisplay =document.getElementById("temperature");
   const descriptionDisplay =document.getElementById("description");
  const errorMesssage =document.getElementById("error-message");
  const API_KEY="cf0049ddbe86407cb3fe1b3faaa70df1";

  if (!cityInput || !getWeatherBtn) {
    console.error('Required DOM elements are missing. Check the input/button IDs.');
    return;
  }

getWeatherBtn.addEventListener('click',async()=>{
    const city=cityInput.value.trim();
    if(!city) return;
    //it may throw an error
    //server is always in another continent
    try{
      const weatherData = await fetchWeatherData(city);
      //display the data 
      displayWeatherData(weatherData);

    }catch(error){
        showError();
    
    }

})
 async function fetchWeatherData(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    return data;
 }

function displayWeatherData(weatherData){
    const { name, main, weather } = weatherData;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `${main.temp}°C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
    weatherInfo.classList.remove('hidden');
    errorMesssage.classList.add('hidden');

    
    
//display
}
function showError(){
   weatherInfo.classList.add('hidden');
   errorMesssage.classList.remove('hidden');
   

}


   
})