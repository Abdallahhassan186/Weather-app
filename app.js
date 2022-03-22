// Personal API Key for OpenWeatherMap API.. some charactrs has been deleted for security purposes
const apiKey =',us&appid=24ca13cf1fac79b923359175&units=imperial';

/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
    e.preventDefault();
    // get user input values
    const newZip = document.getElementById('zip').value;
    const newFeel = document.getElementById('feelings').value;

    getWeatherData(baseURL, newZip, apiKey)
    .then(function (data){
        postData('http://localhost:8080/addData', { date: newDate,temp: data.main.temp, content:newFeel } )
        .then(function() {
            updateUIElem()
        })
    })
}


/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, newZip, apiKey)=>{

  const response = await fetch(baseURL + newZip + apiKey);
  try {
      const data = await response.json();
      return data;
  }
  catch(error) {
      console.log('error', error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {"Content-Type": "application/json;charset=UTF-8"},
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      })
    })
    try {
      const newData = await req.json();
      return newData;
    }
    catch (error) {
      console.log(error);
    }
  };



/*function to update UI elements*/
const updateUIElem = async () => {
    const request = await fetch('/all');
    try {
    const allData = await request.json()
    // Write updated data to DOM elements
    document.getElementById('date').innerHTML = "Date: "+allData.date;
    document.getElementById('temp').innerHTML = "Temperature is " +allData.temp + " Fahrenheit";
    document.getElementById('content').innerHTML = "You\'re feeling "+allData.content;
    }
    catch (error) {
      console.log("error", error);
    }
  }
