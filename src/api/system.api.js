import SystemActions from "../actions/SystemActions";

class SystemAPI {


    /* Get endpoints for the current daydash system */
    getSystemEndpoints() {
        const hostname = window.location.hostname;
        let url = `//${hostname}:3010/v1/system/endpoints`;

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
                    SystemActions.recieveEndpointData(data);
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    /* Get nearby wireless APs for the current daydash system */
    getWifiAPs() {
        const hostname = window.location.hostname;
        let url = `//${hostname}:3010/v1/system/wifiaps`;

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
                    SystemActions.recieveWIFIData(data);
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

}

export default new SystemAPI();