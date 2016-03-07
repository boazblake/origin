console.log($)
console.log(Backbone)

var searchBar = document.querySelector('input[type=search]')
var nowButton = document.querySelector('.now')
var hourButton = document.querySelector('.hour')
var weekButton = document.querySelector('.week')
// var searchButton = document.querySelector('#submit')

var forcast_io_API_URL = null
var weatherURL = 'https://api.forecast.io/forecast/d7c581e2b766cf40745ce91f6d928b84'
function convertMS(ms) {
var d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
return { d: d, h: h, m: m, s: s };
};

function build_Forcast_API_URL(input_Lat, input_long) {

    return weatherURL + '/' + input_Lat + ',' + input_long + '?callback=?'
}

/////////// MAIN CONTROLLER

//HASH CONTROL and View Changer
function controller() {

    var route = window.location.hash.substr(2)
    var routeParts = route.split('/')//.pop()
    var stringLat = routeParts[0]
    var stringLong = routeParts[1]
    var viewType = routeParts[2]

    
    console.log(window.location.hash)
    
    console.log(route)
    console.log(routeParts)
    console.log(stringLat)
    console.log(stringLong)
    console.log(viewType)

    var forcast_URL = build_Forcast_API_URL(stringLat, stringLong)
    console.log(forcast_URL)


    if (viewType === 'week')
    	{make_And_Return_Forecast_Promise(forcast_URL).then(render_Week_View)}

    else if (viewType === 'hour')
    	{make_And_Return_Forecast_Promise(forcast_URL).then(render_Hour_View)}

    else {
    	make_And_Return_Forecast_Promise(forcast_URL).then(render_Now_View)
     }
    
    }

function handle_Forcast_Data(forcast_Data) {
    console.log(forcast_Data)
        // View CONTROL

        if (viewType === 'hour') {
            render_Hour_View(currentQuery)
        } else if (viewType === 'week') {
            render_Week_View(currentQuery)
        } else if (viewType === false) {
            render_Now_View(currentQuery)
            console.log(currentQuery)
        } 
        // write string to DOM here depending on view.
}

// Button gets clicked to change view
function button_Press(event) {
    var buttonThatWasClicked = event.target
    console.log(buttonThatWasClicked.value)
    console.log(nowButton.value)
    var view
    if (buttonThatWasClicked.value === nowButton.value) {
        view = 'now'
    } else if (buttonThatWasClicked.value === hourButton.value) {
        view = 'hour'
    } else if (buttonThatWasClicked.value === weekButton.value) {
        view = 'week'
    }

    console.log(window.location.hash)
    var routeParts = window.location.hash.substr(2).split('/')
    routeParts[2] = view

    var newRoute = routeParts.join('/')

    window.location.hash = '/'+ newRoute //base_Loc_Has + appendages

    console.log(window.location.hash)
    // if (window.location.hash) {
        // window.location.href.split('#')[0]
        
  //       if (view === 'now'){
  //   make_And_Return_Forecast_Promise(forcast_URL).then(render_Week_View)
		// }
		// else if (view === 'hour') {
  //   make_And_Return_Forecast_Promise(forcast_URL).then(render_Hour_View)
		// } 
		// else{
  //   make_And_Return_Forecast_Promise(forcast_URL).then(render_Week_View)
		// }
	// }
}

// Geolocation Function Success
function successCallBack(positionObject) {
    console.log(positionObject)
    baseURL = weatherURL
    var lat = positionObject.coords.latitude
    var long = positionObject.coords.longitude

    forcast_io_API_URL = build_Forcast_API_URL(lat, long)
    console.log(forcast_io_API_URL)
    window.location.hash = '/' + lat + '/' + long + '/' + 'now'

}

// Geolocation Function Failed --- need to run somethign here....
function FailedCallBack(positionObject) {
	console.log(positionObject)
	// var weatherBox.innerHTML
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

//Google Geocoder converter
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

// from Google geolocator to URL
function parse_Google_Lat_Long(google_Data) {
    var results = google_Data.results
    var google_lat_Long = results[0].geometry.location
    console.log(google_lat_Long)
    var lat = google_lat_Long.lat
    var long = google_lat_Long.lng
    window.location.hash = '/' + lat + '/' + long
}

// Parameters for Google Geocoder
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

// make and return Promise Defined & parameters formatted
function make_And_Return_Forecast_Promise(inputURL, paramsObj) {
    return $.getJSON(inputURL)
}

// Capturing Now Data
function render_Now_View(current_Weather_Data) {

    var current_WeatherDetails = current_Weather_Data.currently
    var weatherBox = document.querySelector('#weatherData')
    var tempData = current_WeatherDetails.temperature
    var iconData = current_WeatherDetails.icon
    var textData = current_WeatherDetails.summary
    var dateData = current_WeatherDetails.time
    console.log(convertMS(dateData))
    var date = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var day = weekday[date.getDay()];
    
    var monthName = new Array(7);
    monthName[0] = "January";
    monthName[1] = "Febuary";
    monthName[2] = "March";
    monthName[3] = "April";
    monthName[4] = "May";
    monthName[5] = "June";
    monthName[6] = "July";
    monthName[7] = "August";
    monthName[8] = "September";
    monthName[9] = "October";
    monthName[10] = "November";
    monthName[11] = "December";

    var month = monthName[date.getMonth()]
    var dateofMonth = date.getDate()

    console.log(month)
    var HTML_Str_To_DOM = ''
    var rainData = current_WeatherDetails.precipProbability
    weatherBoxUL = '<Div class="nowContainer">'
    weatherBoxTemp ='<h6 clas="nowDeets" id="temp"> Todays Temp:	' + tempData + '  &deg </h6>'
    weatherBoxFullDate = '<h6 clas="nowDeets" id="fullDate">' + day +' '+dateofMonth+' '+ month + '' +date.getFullYear() +'</h6>'
    weatherBoxRain = '<h6 clas="nowDeets" id="rain"> Chance of Rain:	' + rainData + '</h6>'
    weatherBoxIcon = '<canvas class="nowDeets" id="icon">' + iconData + '</canvas>'
    weatherBoxText = '<h6 clas="nowDeets" id="text">' + textData + '</h6>'

    HTML_Str_To_DOM = weatherBoxUL + weatherBoxTemp + weatherBoxFullDate + weatherBoxRain + weatherBoxIcon + weatherBoxText

    // ////////// Setting the temp bar height
    var background = document.querySelector('.tempBackDrop').style.height = "400px";
    var thermom = document.querySelector('.fluidObject').style.	height =   parseInt(tempData) / 100 *  parseInt(background)  + 'px';


    return weatherBox.innerHTML = HTML_Str_To_DOM

}

// Capturing Hour Data
function render_Hour_View(hourly_Weather_Data) {

    console.log(hourly_Weather_Data.hourly)
        // Summary and Icon
    var hour_WeatherDetails = hourly_Weather_Data.hourly.summary
    	// hour_WeatherDetails += hourly_Weather_Data.hourly.icon
    	console.log(hour_WeatherDetails)

    var hour_by_Hour_Array = hourly_Weather_Data.hourly.data

    function View_Constructor(dom_node_element, templateBuilder_fn) {
        this._node_element = dom_node_element
        this._template = templateBuilder_fn

        this.renderHTML = function(input_data) {

            var targetDOM_element = document.querySelector(this._node_element)

            targetDOM_element.innerHTML = this._template(input_data)

            console.log(targetDOM_element)
        }
    }

    // var someHTMLTemplate = null

    function hour_by_Hour_Template(hour_Array) {
        var array_HTML_str = ''
        console.log(hour_Array)
        var hour = 0
        var hour_details = hour_WeatherDetails
        for (var i = 0; i < hour_Array.length; i++) {

            for (var i = 1; i < hour_Array.length; i++) {
            var fullDate = new Date(1457280000)
		   
		    // var hour = fulldate.getTime();
                hour = hour_Array[i].time
           
                console.log(fullDate)


            var hour_Temp = '<p>Hour'+[i]+': ' + hour + '</p>'
                hour_Temp += '<p>Temp: ' + hour_Array[i].temperature + 'F</p>'
                hour_Temp += '<p> chance of rain: ' + hour_Array[i].precipProbability + '</p>'
                array_HTML_str += '<div class="hourContainer">' + hour_Temp + '</div>'
            
                // ////////// Setting the temp bar height
                var background = document.querySelector('.tempBackDrop').style.height = "400px";
                var thermom = document.querySelector('.fluidObject').style.	height = parseInt(hour_Array[i].temperature) / 100 *  parseInt(background)  + 'px';

            }

        }
        return 'Today will be: ' +  hour_WeatherDetails + array_HTML_str
    }

    var hourViewInstance = new View_Constructor('#weatherData', hour_by_Hour_Template)
    
    hourViewInstance.renderHTML(hour_by_Hour_Array)

}

// Capturing week Data
function render_Week_View(Week_Weather_Data) {

    console.log(Week_Weather_Data)
        // Summary and Icon
    var week_WeatherDetails = Week_Weather_Data.daily.summary
    console.log(week_WeatherDetails)

    var week_Array = Week_Weather_Data.daily.data
    console.log()

    function week_Constructor(dom_node_element, templateBuilder_fn) {
        this._node_element = dom_node_element
        this._template = templateBuilder_fn

        this.renderHTML = function(input_data) {

            var targetDOM_element = document.querySelector(this._node_element)

            targetDOM_element.innerHTML = this._template(input_data)

            console.log(targetDOM_element)
        }
    }

    function week_Template(week_Array) {
        var array_HTML_str = ''
        console.log(week_Array)

        for (var i = 0; i < week_Array.length; i++) {
        	var day = week_Array[i]
        	var time = day.time
        	time = time * 1000
        	console.log(time)

            for (var i = 0; i < week_Array.length; i++) {
	            var fulldate = new Date()
                var weekData = week_Array[i].time
                var date = new Date();
                var weekday = new Array(7);
	                weekday[0] = "Sunday";
	                weekday[1] = "Monday";
	                weekday[2] = "Tuesday";
	                weekday[3] = "Wednesday";
	                weekday[4] = "Thursday";
	                weekday[5] = "Friday";
	                weekday[6] = "Saturday";
            	var day = weekday[date.getDay() ]
	            var week_Temp = '<p>Day: ' + day + '</p>'
	                week_Temp += '<p>Max_Temp: ' + week_Array[i].temperatureMax + 'F<br>'
	                week_Temp += 'Min_Temp: ' + week_Array[i].temperatureMin + 'F </p>'
	                week_Temp += '<p> chance of rain: ' + week_Array[i].precipProbability + '</p>'
	                array_HTML_str += '<div class="weekContainer">' + week_Temp + '</div>'
	           

			    // ////////// Setting the temp bar height
			    var background = document.querySelector('.tempBackDrop').style.height = "400px";
			    var thermom = document.querySelector('.fluidObject').style.	height =   parseInt(week_Array[i].temperatureMax) / 100 *  parseInt(background)  + 'px';
            }
        }

        return '<p class="summery">This Weeks Summary is: ' +  week_WeatherDetails + '</p>'+ array_HTML_str 
    }

    var week_ViewInstance = new week_Constructor('#weatherData', week_Template)
    week_ViewInstance.renderHTML(week_Array)
}

// WebApp Initialized -- check for hash change
window.location.hash = '#'

if (window.location.hash) {
    controller()
} else {
    navigator.geolocation.getCurrentPosition(successCallBack, FailedCallBack)
}
searchBar.addEventListener('keydown', newSearch)
nowButton.addEventListener('click', button_Press)
hourButton.addEventListener('click', button_Press)
weekButton.addEventListener('click', button_Press)
window.addEventListener('hashchange', controller)
