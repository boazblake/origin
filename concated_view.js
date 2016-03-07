// concated data
    // ////////// Setting the temp bar height
    var background = document.querySelector('.tempBackDrop').style.height = "400px";
    var thermom = document.querySelector('.fluidObject').style. height =   parseInt(tempData) / 100 *  parseInt(background)  + 'px';

     // When button is pressed -- how to diffrentiate?
// Capturing Hour and Week Data 
function render_View(Weather_Data) {


    console.log(Weather_Data.hourly)
    console.log(Weather_Data.daily)

        // Summary and Icon
    var hour_WeatherDetails = Weather_Data.hourly.summary
    var week_WeatherDetails = Weather_Data.daily.summary
        // hour_WeatherDetails += Weather_Data.hourly.icon
        console.log(hour_WeatherDetails)
        console.log(week_WeatherDetails)

    var hour_By_Hour_Array = Weather_Data.hourly.data
        console.log(hour_By_Hour_Array)

    var day_By_Day_Array = Weather_Data.daily.data

    // THE CONSTRUCTOR - takes in dom node location and template
    function View_Constructor(dom_node_element, templateBuilder_fn) {
        this._node_element = dom_node_element
        this._template = templateBuilder_fn
        // putting the template with data  on the HTML
        this.renderHTML = function(input_data) {

            // definin the Node elememnt for the template
            var targetDOM_element = document.querySelector(this._node_element)

            targetDOM_element.innerHTML = this._template(input_data)

            console.log(targetDOM_element)
        }
    }

    // The template to write to DOM
    // HOUR
    function hour_by_Hour_Template(hour_By_Hour_Array) {
        var array_HTML_str = ''
        console.log(hour_By_Hour_Array)
        var hour = 0
        var hour_details = hour_WeatherDetails
        for (var i = 0; i < hour_By_Hour_Array.length; i++) {

            // // Date object -- time_value: NOW
            // // var nowDate = new Date()

            for (var i = 0; i < hour_By_Hour_Array.length; i++) {
            var fulldate = new Date()
                var hour = hour_By_Hour_Array[i].time
           
                console.log(hour)


            var hour_Temp = '<h2>Hour'+[i]+': ' + hour + '</h5>'
                hour_Temp += '<h5>Temp: ' + hour_By_Hour_Array[i].temperature + 'F</h5>'
                hour_Temp += '<h4> chance of rain: ' + hour_By_Hour_Array[i].precipProbability + '</h4>'
                array_HTML_str += '<div class="hourContainer">' + hour_Temp + '</div>'
            }
        }
        return 'Today will be: ' +  hour_WeatherDetails + array_HTML_str
    }

    // The template to write to DOM
    // WEEK
        function week_Template(day_By_Day_Array) {
        var array_HTML_str = ''
        console.log(day_By_Day_Array)
        // var week = ''
        // var week_details = week_WeatherDetails
                // console.log(week_details)

        for (var i = 0; i < day_By_Day_Array.length; i++) {
            var day = day_By_Day_Array[i]
            var time = day.time
            time = time * 1000
            console.log(time)
            // // Date object -- time_value: NOW
            // // var nowDate = new Date()

            for (var i = 0; i < day_By_Day_Array.length; i++) {
            var fulldate = new Date()
                var weekData = day_By_Day_Array[i].time
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
                week_Temp += '<h5>Max_Temp: ' + day_By_Day_Array[i].temperatureMax + 'F<br>'
                week_Temp += 'Min_Temp: ' + day_By_Day_Array[i].temperatureMin + 'F </h5>'
                week_Temp += '<h4> chance of rain: ' + day_By_Day_Array[i].precipProbability + '</h4>'
                week_Temp += '<p> chance of rain: ' + day_By_Day_Array[i].icon + '</p>'
                array_HTML_str += '<div class="weekContainer">' + week_Temp + '</div>'
            }
        }

        return '<p class="summery">This Weeks Summary is: ' +  week_WeatherDetails + '</p>'+ array_HTML_str
    }

    var hourViewInstance = new View_Constructor('#weatherData', hour_by_Hour_Template)
    hourViewInstance.renderHTML(hour_By_Hour_Array)
    var week_ViewInstance = new View_Constructor('#weatherData', week_Template)
    week_ViewInstance.renderHTML(day_By_Day_Array)
}