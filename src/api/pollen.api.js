import PollenActions from "../actions/PollenActions";


class PollenAPI {


    /* Get pollen counts for the given zipcode */
    getPollen(zipcode) {
        //  The base url for the service - change this to your service location:
        let url = "//localhost:3010/v1/dashboard/pollen";

        let apiHeaders = new Headers({
            "Content-Type": "application/json; charset=UTF-8",
        });

        let params = {};
        params.zipcode = zipcode;

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
                    PollenActions.recievePollenData(data, zipcode);
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

}

export default new PollenAPI();