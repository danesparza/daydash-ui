import CalendarActions from "../actions/CalendarActions";

class CalendarAPI {


    /* Get calendar events for the given iCal file and timezone */
    getCalendarEvents(calurl, timezone) {
        const hostname = window.location.hostname;
        let url = `//${hostname}:3010/v1/dashboard/calendar`;

        let apiHeaders = new Headers({
            "Content-Type": "application/json; charset=UTF-8",
        });

        let params = {};
        params.url = calurl;
        params.timezone = timezone;

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
                    CalendarActions.recieveCalendarData(data, calurl, timezone);
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

}

export default new CalendarAPI();