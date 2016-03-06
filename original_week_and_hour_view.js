// ORIGNIAL - everythign form here


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

            // // Date object -- time_value: NOW
            // // var nowDate = new Date()


            for (var i = 0; i < hour_Array.length; i++) {
            var fulldate = new Date()
                var hour = hour_Array[i].time
           
                console.log(hour)


            var hour_Temp = '<h2>Hour'+[i]+': ' + hour + '</h5>'
                hour_Temp += '<h5>Temp: ' + hour_Array[i].temperature + 'F</h5>'
                hour_Temp += '<h4> chance of rain: ' + hour_Array[i].precipProbability + '</h4>'
                array_HTML_str += '<div class="hourContainer">' + hour_Temp + '</div>'
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

    // var someHTMLTemplate = null

    function week_Template(week_Array) {
        var array_HTML_str = ''
        console.log(week_Array)
        // var week = ''
        // var week_details = week_WeatherDetails
                // console.log(week_details)

        for (var i = 0; i < week_Array.length; i++) {
        	var day = week_Array[i]
        	var time = day.time
        	time = time * 1000
        	console.log(time)
            // // Date object -- time_value: NOW
            // // var nowDate = new Date()


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
                var week = weekday[date.getDay()];
            var week_Temp = '<h2>Day: ' + week + '</h5>'
                week_Temp += '<h5>Max_Temp: ' + week_Array[i].temperatureMax + 'F<br>'
                week_Temp += 'Min_Temp: ' + week_Array[i].temperatureMin + 'F </h5>'
                week_Temp += '<h4> chance of rain: ' + week_Array[i].precipProbability + '</h4>'
                week_Temp += '<p> chance of rain: ' + week_Array[i].icon + '</p>'
                array_HTML_str += '<div class="weekContainer">' + week_Temp + '</div>'
            }
        }
        return '<p class="summery">This Weeks Summary is: ' +  week_WeatherDetails + '</p>'+ array_HTML_str 

    }


    var week_ViewInstance = new week_Constructor('#weatherData', week_Template)
    week_ViewInstance.renderHTML(week_Array)
}