console.log($)

var searchBar = document.querySelector('input')
var nowButton = document.querySelector('.now')
var hourButton = document.querySelector('.hour')
var weekButton = document.querySelector('.week')

var forcast_io_API_URL = null
var weatherURL = 'https://api.forecast.io/forecast/d7c581e2b766cf40745ce91f6d928b84'

function build_Forcast_API_URL(input_Lat, input_long) {

    return weatherURL + '/' + input_Lat + ',' + input_long
}


/////////// MAIN CONTROLLER

//HASH CONTROL
function controller() {

    var route = window.location.hash.substr(2)
    var routeParts = route.split(',')
    var stringLat = routeParts[0]
    var stringLong = routeParts[1]
    var viewchanged = stringLong.split('/')
    if (viewchanged[1]) {
        handle_Forcast_Data()
    }
    // if (stringLong === undefined) stringLong = 0
    console.log(routeParts)
    console.log(stringLat)
    console.log(stringLong)
    console.log(viewchanged)


    var forcast_URL = build_Forcast_API_URL(stringLat, stringLong)
    console.log(forcast_URL)

    make_And_Return_Forecast_Promise(forcast_URL).then(render_Week_View)
}

function handle_Forcast_Data(forcast_Data) {
    console.log(forcast_Data)
        // // View CONTROL
        // if (viewType === 'now') {
        //     render_Now_View(currentQuery)
        //     console.log(currentQuery)
        // } 
        // else if (viewType === 'hour') {
        //     render_Hour_View(currentQuery)
        // } else if (viewType === 'week') {
        //     render_Week_View(currentQuery)
        // }
        // write string to DOM here depending on view.
}

// Button gets clicked to change view
function button_Press(event) {
    var buttonThatWasClicked = event.target
    console.log(buttonThatWasClicked)
    if (buttonThatWasClicked === nowButton) {
        view = 'now'
    } else if (buttonThatWasClicked === hourButton) {
        view = 'hour'
    } else if (buttonThatWasClicked === weekButton) {
        view = 'week'
    }
    // location.hash = '#' + buttonThatWasClicked.value + '/' + view
    base_Loc_Has = location.hash
    var appendages = '/' + view
    window.location.hash = base_Loc_Has + appendages

    console.log(base_Loc_Has)
    if (window.location.hash) {
        // window.location.href.split('#')[0]
        controller()
    }
}


// Geolocation Function Success
function successCallBack(positionObject) {
    console.log(positionObject)
    baseURL = weatherURL
    var lat = positionObject.coords.latitude
    var long = positionObject.coords.longitude

    forcast_io_API_URL = build_Forcast_API_URL(lat, long)
    console.log(forcast_io_API_URL)
    window.location.hash = '/' + lat + ',' + long

}

// Geolocation Function Failed --- need to run somethign instead of this.
function FailedCallBack(positionObject) {
    baseURL = weatherURL
    var lat = positionObject.coords.latitude
    var long = positionObject.coord.longitude
    var fullURL = baseURL + '/' + lat + ',' + long
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
    window.location.hash = '/' + lat + ',' + long
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
    // console.log(paramsObj)
    // var formattedParams = ''
    // if (paramsObj) formattedParams = _formattedURLParams(paramsObj)
    // else {
    //     formattedParams = null
    // }

    return $.getJSON(inputURL) //+ formattedParams

}

// Capturing Current Data
function render_Now_View(current_Weather_Data) {
    console.log(current_Weather_Data)

    //current Weather//
    var current_WeatherDetails = current_Weather_Data.currently
    console.log(current_WeatherDetails)
        // TEMP
    var WeatherBox = document.querySelector('#weatherData')
    console.log(WeatherBox)
    var tempData = current_WeatherDetails.temperature
    WeatherBox.innerHTML = '<h1>' + tempData + '</h1>'
    console.log(WeatherBox.innerHTML)
        //icon
    var iconData = current_WeatherDetails.icon
    console.log(iconData)
    WeatherBox.innerHTML += '<h1>' + iconData + '</h1>'
    console.log(WeatherBox.innerHTML)
        //     //text
    var textData = current_WeatherDetails.summary
    console.log(textData)
    WeatherBox.innerHTML += '<h1>' + textData + '</h1>'
    console.log(WeatherBox.innerHTML)
        //     //Date
    var dateData = current_WeatherDetails.time
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
    console.log(day)
    WeatherBox.innerHTML += '<h1>' + day + '</h1>'
        //rain
    var rainData = current_WeatherDetails.precipProbability
    console.log(rainData)
    WeatherBox.innerHTML += '<h1> Chance of Rain:	' + rainData + '</h1>'
    console.log(WeatherBox.innerHTML)
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

    var someHTMLTemplate = null

    function hour_by_Hour_Template(hour_Array) {
        var array_HTML_str = ''
        console.log(hour_Array)
        var hour = 0
        var hour_details = hour_WeatherDetails
        for (var i = 0; i < hour_Array.length; i++) {

            // // Date object -- time_value: NOW
            // // var nowDate = new Date()


            for (var i = 0; i < hour_Array.length; i++) {
            var fulldate = new Date()
                var hour = hour_Array[i].time
           
                console.log(hour)


            var hour_Temp = '<h2>Hour: ' + hour + '</h5>'
                hour_Temp += '<h5>Temp: ' + hour_Array[i].temperature + '<F /h5>'
                hour_Temp += '<h4> chance of rain: ' + hour_Array[i].precipProbability + '</h4>'
                array_HTML_str += '<div class="hourContainer">' + hour_Temp + '</div>'
            }
        }
        return 'Todays Summary is: ' +  hour_WeatherDetails + array_HTML_str
    }


    var hourViewInstance = new View_Constructor('#weatherData', hour_by_Hour_Template)
    
    contentViewInstance.renderHTML(hour_by_Hour_Array)
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

    var someHTMLTemplate = null

    function week_Template(week_Array) {
        var array_HTML_str = ''
        console.log(week_Array)
        var week = ''
        var week_details = week_WeatherDetails
                console.log(week_details)

        for (var i = 0; i < week_Array.length; i++) {

            // // Date object -- time_value: NOW
            // // var nowDate = new Date()


            for (var i = 0; i < week_Array.length; i++) {
            var fulldate = new Date()
                var week = week_Array[i].time
           
                console.log(week)


            var week_Temp = '<h2>week: ' + week + '</h5>'
                week_Temp += '<h5>Max_Temp: ' + week_Array[i].temperatureMax + '<F /h5>'
                week_Temp += '<h5>Min_Temp: ' + week_Array[i].temperatureMin + '<F /h5>'
                week_Temp += '<h4> chance of rain: ' + week_Array[i].precipProbability + '</h4>'
                week_Temp += '<h3> chance of rain: ' + week_Array[i].summary + '</h3>'
                array_HTML_str += '<div class="weekContainer">' + week_Temp + '</div>'
            }
        }
        return 'This Weeks Summary is: ' +  week_WeatherDetails + array_HTML_str
    }


    var week_ViewInstance = new week_Constructor('#weatherData', week_Template)
    week_ViewInstance.renderHTML(week_Array)
}


// WebApp Initialized -- check for hash change
window.location.hash = ''
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
