console.log($)
    // Common Var

var searchBar = document.querySelector('input')
var nowButton = document.querySelector('.now')
var hourButton = document.querySelector('.hour')
var weekButton = document.querySelector('.week')

var forcast_io_API_URL = null
var weatherURL = 'https://api.forecast.io/forecast/d7c581e2b766cf40745ce91f6d928b84'

function build_Forcast_io_API_URL(input_Lat, input_long) {
	 return weatherURL + '/' + input_Lat + ',' + input_long
}


/////////// MAIN CONTROLLER

//HASH CONTROL
function controller() {
    var route = window.location.hash.substr(2) //hasQuery stores the "#..." the substr(1) removes the #
    var routeParts = route.split(','),
        stringLat = routeParts[0],
        stringLong = routeParts[1] //'garfield'
    console.log(route)
    console.log(stringLat)
    console.log(stringLong)
    // console.log(jsonWeatherData)

   var forcastURL =  build_Forcast_io_API_URL(stringLat, stringLong)
   console.log(forcastURL)

   make_And_Return_Weather_Promise(forcastURL).then(show_Data_for_Lat_Long) //removed  { callBack: '?' }



// // View CONTROL
//     if (viewType === 'now') {
//         render_Now_View(currentQuery)
//         console.log(currentQuery)
//     } 
//     else if (viewType === 'hour') {
//         render_Hour_View(currentQuery)
//     } else if (viewType === 'week') {
//         render_Week_View(currentQuery)
//     }
}


function show_Data_for_Lat_Long(jsonWeatherData) {
	console.log(jsonWeatherData)
// write string to DOM here
}



// Button gets clicked to change view
function change_View(event) {
    var buttonThatWasClicked = event.target
    if(buttonThatWasClicked === nowButton) {
    	view = 'now'
    } else if (buttonThatWasClicked === hourButton) {
    	view = 'hour'
    } else if (buttonThatWasClicked === weekButton) {
    	view = 'week'
    }
    location.hash = '#' + buttonThatWasClicked.value + '/' + view
    console.log(location.hash)
    
    if (window.location.hash) {
        controller()
}
}


// Geolocation Function Success
function successCallBack(positionObject) {
    console.log(positionObject)
    baseURL = weatherURL
    var lat = positionObject.coords.latitude
    var long = positionObject.coords.longitude

    forcast_io_API_URL = build_Forcast_io_API_URL(lat, long)
    console.log(forcast_io_API_URL)
    window.location.hash = '/' + lat + ',' + long

}

// Geolocation Function Failed
function FailedCallBack(positionObject) {
    baseURL = weatherURL
    var lat = positionObject.coords.latitude
    var long = positionObject.coord.longitude
    var fullURL = baseURL + '/' + lat + ',' + long
    make_And_Return_Weather_Promise(fullURL).then(controller) //removed  { callBack: '?' }
}

// Search Function
function newSearch(keyEvent) {
    var searchBarCapture = keyEvent.target
    if (keyEvent.keyCode === 13) {
        var userLookUpVal = searchBarCapture.value
			GeocoderRequest(userLookUpVal)
        	console.log(userLookUpVal)

    }
}


// Parameters

function _formattedURLParams(paramsObj) {
    console.log(paramsObj)
    var paramString = ''
    for (var paramKey in paramsObj) {
        paramsObjValue = paramsObj[paramKey]
        paramString = '&' + paramKey + '=' + paramsObjValue
    }
    var splitString = paramString.split(' ')
   	var joinString = splitString.join('+')
   	var returnString = joinString.substr(1)
    return '?' + returnString
}

// 

var GeocoderRequest = function(query) {
	console.log(query)
	var params = {
		address: query,
	}

	var baseURL = 'https://maps.googleapis.com/maps/api/geocode/json'
	var fullURL = baseURL + _formattedURLParams(params)
	console.log(fullURL)
	var promise_To_Google = $.getJSON(fullURL)
	promise_To_Google.then(parse_Google_Lat_Long)
}

function parse_Google_Lat_Long(google_Data) {
	var results = google_Data.results
	var google_lat_Long = results[0].geometry.location
	console.log(google_lat_Long)
 	var lat = google_lat_Long.lat
 	var long = google_lat_Long.lng
	window.location.hash = '/' + lat + ',' + long
 	}



// make and return Promise Defined & parameters formatted
function make_And_Return_Weather_Promise(inputURL, paramsObj) {
    var formattedParams = ''
    if (paramsObj) formattedParams = _formattedURLParams(paramsObj)
    else {
    	formattedParams = ''
    }

    return $.getJSON(inputURL + formattedParams)

}


// Capturing Current Data
function render_Now_View(current_Weather_Data) {
    console.log(current_Weather_Data)

// var current_Data_To_DOM = 



    // //current Weather//
    // var currentWeatherDetails = current_Weather_Data.currently
    //     //TEMP
    // var tempBox = document.querySelector('.temp')
    //     // console.log(temp)
    // var tempData = currentWeatherDetails.temperature
    // tempBox.innerHTML = '<h1>' + tempData + '</h1>'
    // console.log(tempBox.innerHTML)
    //     //icon
    // var iconBox = document.querySelector('.icon')
    // var iconData = currentWeatherDetails.icon
    // console.log(iconData)
    // iconBox.innerHTML = '<h1>' + iconData + '</h1>'
    // console.log(iconBox.innerHTML)
    //     //text
    // var textBox = document.querySelector('.text')
    // var textData = currentWeatherDetails.icon
    // console.log(textData)
    // textBox.innerHTML = '<h1>' + textData + '</h1>'
    // console.log(textBox.innerHTML)
    //     //Date
    // var dateBox = document.querySelector('.date')
    // var dateData = currentWeatherDetails.time
    // var date = new Date();
    // var weekday = new Array(7);
    // weekday[0] = "Sunday";
    // weekday[1] = "Monday";
    // weekday[2] = "Tuesday";
    // weekday[3] = "Wednesday";
    // weekday[4] = "Thursday";
    // weekday[5] = "Friday";
    // weekday[6] = "Saturday";
    // var day = weekday[date.getDay()];
    // console.log(day)
    // dateBox.innerHTML = '<h1>' + day + '</h1>'
    //     //rain
    // var rainBox = document.querySelector('.rain')
    // var rainData = currentWeatherDetails.precipProbability
    // console.log(rainData)
    // rainBox.innerHTML = '<h1> Chance of Rain:	' + rainData + '</h1>'
    // console.log(rainBox.innerHTML)
}



// WebApp Initialized -- check for hash change
window.location.hash = ''
if (window.location.hash) {
    controller()
} else {
    navigator.geolocation.getCurrentPosition(successCallBack, FailedCallBack)
}
searchBar.addEventListener('keydown', newSearch)
nowButton.addEventListener('click', change_View)
hourButton.addEventListener('click', change_View)
weekButton.addEventListener('click', change_View)
window.addEventListener('hashchange', controller)

