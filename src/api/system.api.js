import WeatherActions from "../actions/WeatherActions";

class SystemAPI {


    /* Get endpoints for the current daydash system */
    getSystemEndpoints(lat, long) {
        let url = "//localhost:3010/v1/system/endpoints";

        let apiHeaders = new Headers({
            "Content-Type": "application/json; charset=UTF-8",
        });

        fetch(url, {
                mode: 'cors',
                method: 'get',
                headers: apiHeaders
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

export default new SystemAPI();