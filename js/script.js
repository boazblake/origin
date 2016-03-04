console.log( $ )
// Common Var
var searchBar = document.querySelector( 'input' ) 
var weatherURL = 'https://api.forecast.io/forecast/d7c581e2b766cf40745ce91f6d928b84'


// Geolocation Function Success
function successCallBack( positionObject ) {
	console.log(positionObject)
	baseURL = weatherURL
	var lat = positionObject.coords.latitude
	var long = positionObject.coords.longitude
	var fullURL = baseURL + '/' + lat + ',' + long
	console.log(fullURL)
	makeAndReturnPromise( fullURL ).then( handleWeatherData )
}

// Geolocation Function Failed
function FailedCallBack( positionObject ){
	baseURL = weatherURL
	var lat = positionObject.coords.latitude
	var long = positionObject.coord.longitude
	var fullURL = baseURL + '/' + lat + ',' + long
	makeAndReturnPromise( fullURL ).then( handleWeatherData ) //removed  { callBack: '?' }
}


// make and return Promise Defined & parameters formatted
function makeAndReturnPromise( inputURL, paramsObj ) {
	var formattedParams = ''
	console.log(paramsObj)
	if ( paramsObj ) { 
		formattedParams = _formattedURLParams( paramsObj )
		console.log(formattedParams)
		} // if there is a 'paramsObj' , then the return of '_formattedURLParams' on Params object will be stored in 'formattedParams'.
	console.log(inputURL + formattedParams) // not passong this in
	return $.getJSON( inputURL + formattedParams ) // inputURL + formattedParams
}



// Parameters

function _formattedURLParams( paramsObj ) {
	console.log(paramsObj)
	var paramString = ''
	for ( var paramKey in paramsObj ) {
		paramsObjValue = paramsObj[paramKey]
        paramString = '&' + paramKey + '=' + paramsObjValue
	}
	return '?' + paramString.substr(1)
}





// Capturing the Data
function handleWeatherData( rawJsonData ){
	console.log( rawJsonData )

/////////////////////
	//current Weather//
	var currentWeatherDetails = rawJsonData.currently
	//TEMP
	var tempBox = document.querySelector('.temp')
	// console.log(temp)
	var tempData = currentWeatherDetails.temperature
	tempBox.innerHTML = '<h1>' + tempData + '</h1>'
	console.log(tempBox.innerHTML)
	//icon
	var iconBox = document.querySelector('.icon')
	var iconData = currentWeatherDetails.icon
	console.log(iconData)
	iconBox.innerHTML = '<h1>' + iconData + '</h1>'
	console.log(iconBox.innerHTML)
	//text
	var textBox = document.querySelector('.text')
	var textData = currentWeatherDetails.icon
	console.log(textData)
	textBox.innerHTML = '<h1>' + textData + '</h1>'
	console.log(textBox.innerHTML)
	//Date
	var dateBox = document.querySelector('.date')
	var dateData = currentWeatherDetails.time
	var date = new Date();
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	var day = weekday[date.getDay()];
	console.log(day)
	dateBox.innerHTML = '<h1>' + day + '</h1>'
	//rain
	var rainBox = document.querySelector('.rain')
	var rainData = currentWeatherDetails.precipProbability
	console.log(rainData)
	rainBox.innerHTML = '<h1> Chance of Rain:	' + rainData + '</h1>'
	console.log(rainBox.innerHTML)
}


// Search Function

var newSearch = function( keyEvent ) {

	var searchBarCapture = keyEvent.target

	if ( keyEvent.keyCode === 13 ) {

		var userLookUpVal = searchBarCapture.value
		console.log(userLookUpVal)
		// createParamObj(searchBarCapture.value)
		window.location.hash = userLookUpVal
		searchBarCapture.value = ''

	}
		console.log(window.location.hash)

}

searchBar.addEventListener( 'keydown', newSearch )



// A Control function that is listening to the hash
function hashController( hashEvent ){
	var DataLookUpValue = ( window.location.hash ).substr(1)

	
	makeAndReturnPromise( weatherURL ).then( handleWeatherData )
}
window.addEventListener( 'hashchange', hashController )



// WebApp Initialized -- check for hash change
if (window.location.hash) {
    hashController()
} else {
		navigator.geolocation.getCurrentPosition( successCallBack, FailedCallBack )
}