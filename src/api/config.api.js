import ConfigActions from "../actions/ConfigActions";

class ConfigAPI {


    /* Get config data  */
    getConfig() {
        const hostname = window.location.hostname;
        let url = `//${hostname}:3010/v1/config`;

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
                    //  Call the action to receive an error:
                    ConfigActions.recieveConfigError(response.status);                    
                    return;
                }

                // Receive data
                response.json().then(function (data) {
                    //  Call the action to receive the data:
                    ConfigActions.recieveConfigData(data);
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    /* Set config data  */
    saveConfig(config) {
        const hostname = window.location.hostname;
        let url = `//${hostname}:3010/v1/config`;

        let apiHeaders = new Headers({
            "Content-Type": "application/json; charset=UTF-8",
        });
        
        fetch(url, {
                mode: 'cors',
                method: 'post',
                headers: apiHeaders,
                body: JSON.stringify(config)
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
                    ConfigActions.recieveConfigData(data);
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

}

export default new ConfigAPI();