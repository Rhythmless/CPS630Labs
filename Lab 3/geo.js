  
const googleMapApiKey = "AIzaSyCWTy9xeHkFSOyE5EN1fXj5YXwTsnwYc6g";
var fileCord = [];
var lines ="";


function parser(event){
  document.getElementById('file').onchange = function(){
  var file = this.files[0];
  var reader = new FileReader();
  reader.readAsText(file);

    reader.onload = function(progressEvent){
      // Entire file
     // console.log(this.result);
      document.getElementById('fileLocation').innerHTML = "Loaded " + file.name;
      // By lines
      lines = document.getElementById("fileLocation").value = this.result.split('\n');
      for(var line = 0; line < lines.length; line++){
        fileCord.push(lines[line]);
      }
      returnCord();
    };
 // var location = document.getElementById('fileLocation').innerHTMl = this.result;
  };
}

function readfiles(files) {
  // console.log(files);
  reader = new FileReader();
  reader.readAsText(files[0]);

  reader.onload = function(event) {
  document.getElementById('fileLocation').innerHTML = "Loaded " + files[0].name;
 // console.log(reader.result); // will show all of the text from the file

  lines = document.getElementById("fileLocation").value = this.result.split('\n');
    for(var x = 0; x < lines.length; x++){
   //  console.log(lines[x]); //shows lines 
      fileCord.push(lines[x]);
    }
  //console.log(fileCord); // ie.["43.65748683,-79.37976122", "43,-79"]  shows everything in the fileCord array for the coordinates
  returnCord();
  }
}

var holder = document.getElementById('holder');
holder.ondragover = function () { this.className = 'hover'; return false; };
holder.ondragend = function () { this.className = ''; return false; };
holder.ondrop = function (e) {
this.className = '';
//function parser();
e.preventDefault();
readfiles(e.dataTransfer.files);
}

function returnCord(){
  for(a = 0; a < fileCord.length; a ++){
    addMarker(fileCord[a]); // calls function using coord pair that hasn't been split
  }
}

function addMarker(cordArray){
 var markerCord = cordArray.split(', ');

  for(i = 0; i < cordArray.length; i++){
    if(markerCord[i] != null){
      var invCord = markerCord[i].split(","); // splits the coord pair and places it into a variable
    }
  }

  for(j = 0; j < invCord.length; j++){
    if(j == 0){
      markerLat = parseFloat(invCord[j]); // sets marker lat for center
    }
    else{
      markerLong = parseFloat(invCord[j]); // sets marker long for center
    }
  }

  var markerLatLng = {lat: markerLat, lng: markerLong};
  var marker = new google.maps.Marker({
    position: markerLatLng,
    map: map,
    label: "Distance in KM: " + Math.round(getDistance(markerLat,markerLong,userLat,userLong)/1000),
    title: 'Marker Location'
  });

  geocoder.geocode({'location': markerLatLng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(11);
        var amarker = new google.maps.Marker({
          position: markerLatLng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address + "<br />" + "Distance in KM: " + Math.round(getDistance(markerLat,markerLong,userLat,userLong)/1000));
        infowindow.open(map, amarker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });

 // return;
}

var rad = function(x) {
  return x * Math.PI / 180;
};

function getDistance(p1lat, p1lng, p2lat, p2lng){
   var R = 6378137; // Earth’s mean radius in meter
   var dLat = rad(p2lat - p1lat);
   var dLong = rad(p2lng - p1lng);
   var a = Math.sin(dLat / 2) * Math.sin(dLong / 2) + 
    Math.cos(rad(p1lat)) * Math.cos(rad(p2lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
}

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 16
  });
  var infoWindow = new google.maps.InfoWindow({map: map});
  geocoder = new google.maps.Geocoder;
  infowindow = new google.maps.InfoWindow;
 // document.getElementById('submit').addEventListener('click', function() {
//    geocodeLatLng(geocoder, map, infowindow);
 // });
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

function userLocation() {
userLong = parseFloat(document.getElementById('inputLong').value);
userLat = parseFloat(document.getElementById('inputLat').value);

  myLatLng = {lat: userLat, lng: userLong};
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Set Location for User'
    });
 
  geocoder.geocode({'location': myLatLng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

function geocodeLatLng(geocoder, map, infowindow) {
//  for(z = 0; z < fileCord.length; z++){
 // console.log(fileCord[z]);  
  var input = fileCord[0];//document.getElementById('latlng').value;
//  }
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}