import NWSAlertsActions from "../actions/NWSAlertsActions";

class NWSAlertsAPI {


    /* Get weather alerts data for the given coordinates */
    getWeatherAlerts(lat, long) {
        let url = "//localhost:3010/v1/dashboard/nwsalerts";

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
                    NWSAlertsActions.recieveAlertsData(data, lat, long);
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

}

export default new NWSAlertsAPI();