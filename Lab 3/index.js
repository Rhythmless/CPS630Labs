const apiKey = "&APPID=0f1d63df79b8dd837975676165a2e63e";

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  var cityName = document.getElementById("cityInput").value;

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	   	var dailyweather = JSON.parse(this.responseText);
	   	var origtemp = dailyweather.main.temp;
    	var condition =document.getElementById("condition").innerHTML = dailyweather.weather[0].main;
     	var humidity = document.getElementById("humidity").innerHTML = "Humidty "+ dailyweather.main.humidity + "%";
    	var location = document.getElementById("location").innerHTML = dailyweather.name;
      var origwindspeed = dailyweather.wind.speed;
      var windspeed = document.getElementById("windspeed").innerHTML = dailyweather.wind.speed;
      var degree = document.getElementById("degree").innerHTML = dailyweather.wind.deg +" Degrees";
     // var weatherid = document.getElementById("weatherid").innerHTML = dailyweather.weather[0].id;



      console.log(dailyweather);

    	updateInfo(origtemp,origwindspeed); //displays temp in C or F when clicked
/*
      switch(weatherid){
        case "200":
          document.getElementById('weatherid').innerHTML = '<img src  ="11d.png"/>';
          break;
        case "500":
          document.getElementById('weatherid').innerHTML = '<img src  ="09d.png"/>';
          break;
      }
*/
    }
  }

  	xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+ cityName+ apiKey, true);
    xhttp.send();
  //  xhttp.open("GET","http://api.openweathermap.org/data/2.5/forecast/daily?cnt=6&q="+cityName+apiKey, true);
//    xhttp.send();


}

function updateInfo(A,B){ // for the radio buttons to change the values from one to the other
	var defTemp = A; 
  var defSpeed = B;
	if (document.getElementById('C').checked) {
		var temp = document.getElementById("temp").innerHTML = Math.floor(defTemp-273.15) + "C";
    var windspeed = document.getElementById("windspeed").innerHTML =  Math.floor(defSpeed * 3.6) +" km/h";
	}
	else{
		temp = document.getElementById("temp").innerHTML =  Math.floor(((9/5)*(defTemp -273.15))+32) + "F";
    windspeed = document.getElementById("windspeed").innerHTML = Math.floor((25/11)*defSpeed) + " mph";
	} 
}


