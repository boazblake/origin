console.log($)
    // Common Var
var searchBar = document.querySelector('input')
var weatherURL = 'https://api.forecast.io/forecast/d7c581e2b766cf40745ce91f6d928b84'
var nowButton = document.querySelector('.buttons button[value="now"]')
var hourButton = document.querySelector('.buttons button[value="hour"]')
var weekButton = document.querySelector('.buttons button[value="week"]')


function controller(){

/////// Input from url - split
	var route = window.location.hash.substr(1)    //hasQuery stores the "#..." the substr(1) removes the #

	var routeParts = route.split('/'),

		viewType = routeParts[0],
		currentQuery = 'garfield' //routeParts[1]

	if (viewType === 'now') {
		renderScrollView(currentQuery)
	} else if (viewType === 'hour') {
		renderGridView(currentQuery)
	} else if (viewType === 'week') {
		renderDetailView(currentQuery)
	}

}


// Geolocation Function Success
function successCallBack(positionObject) {
    console.log(positionObject)
    baseURL = weatherURL
    var lat = positionObject.coords.latitude
    var long = positionObject.coords.longitude
    var fullURL = baseURL + '/' + lat + ',' + long
    console.log(fullURL)
    makeAndReturnPromise(fullURL).then(handleWeatherData)
}

// Geolocation Function Failed
function FailedCallBack(positionObject) {
    baseURL = weatherURL
    var lat = positionObject.coords.latitude
    var long = positionObject.coord.longitude
    var fullURL = baseURL + '/' + lat + ',' + long
    makeAndReturnPromise(fullURL).then(handleWeatherData) //removed  { callBack: '?' }
}

// make and return Promise Defined & parameters formatted
function makeAndReturnPromise(inputURL, paramsObj) {
    var formattedParams = ''
    console.log(paramsObj)
    if (paramsObj) {
        formattedParams = _formattedURLParams(paramsObj)
        console.log(formattedParams)
    } // if there is a 'paramsObj' , then the return of '_formattedURLParams' on Params object will be stored in 'formattedParams'.
    console.log(inputURL + formattedParams) // not passong this in
    return $.getJSON(inputURL + formattedParams) // inputURL + formattedParams
}

// Parameters

function _formattedURLParams(paramsObj) {
    console.log(paramsObj)
    var paramString = ''
    for (var paramKey in paramsObj) {
        paramsObjValue = paramsObj[paramKey]
        paramString = '&' + paramKey + '=' + paramsObjValue
    }
    return '?' + paramString.substr(1)
}



// Capturing Current Data
function handleWeatherData(rawJsonData) {
    console.log(rawJsonData)
}

    // Search Function

    var newSearch = function(keyEvent) {

        var searchBarCapture = keyEvent.target

        if (keyEvent.keyCode === 13) {

            var userLookUpVal = searchBarCapture.value
            console.log(userLookUpVal)
                // createParamObj(searchBarCapture.value)
            window.location.hash = userLookUpVal
            searchBarCapture.value = ''

        }
        console.log(window.location.hash)

    }

    searchBar.addEventListener('keydown', newSearch)



    // A Control function that is listening to the hash
    function hashController(hashEvent) {
        var DataLookUpValue = (window.location.hash).substr(1)


        makeAndReturnPromise(weatherURL).then(handleWeatherData)
    }
    window.addEventListener('hashchange', hashController)



    // WebApp Initialized -- check for hash change
    if (window.location.hash) {
        hashController()
    } else {
        navigator.geolocation.getCurrentPosition(successCallBack, FailedCallBack)
    }