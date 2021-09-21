import WeatherActions from "../actions/WeatherActions";

class WeatherAPI {


    /* Get weather data for the given coordinates */
    getWeather(lat, long) {
        const hostname = window.location.hostname;
        let url = `//${hostname}:3010/v1/dashboard/weather`;

        let apiHeaders = new Headers({
            "Content-Type": "application/json; charset=UTF-8",
        });

        let params = {};
        params.lat = lat;
        params.long = long;

        fetch(url, {
                mode: 'cors',
                method: 'post',
                headers: apiHeaders,
                body: JSON.stringify(params)
            })
            .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Receive data
                response.json().then(function (data) {
                    //  Call the action to receive the data:
                    WeatherActions.recieveWeatherData(data, lat, long);
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

}

export default new WeatherAPI();