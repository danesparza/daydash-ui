
function WeatherAlert(props) {

    let alertMessage = "";
    let showAlert = false;

    const currentAlerts = props.alerts.alerts; // Get alerts
    // let alertUrl = "";
    let alertText = "";

    //  Wrapped in try/catch just in case
    try{
        if(currentAlerts.length > 0) 
        {
            showAlert = true; // Show the radar image
            alertText = currentAlerts[0].event;
            // alertUrl = props.alerts.alertsurl;
        }
    } catch {}        

    if(showAlert){
        alertMessage = (
            <div className="column">                                                     
                <div className="weatherAlertMessageBody has-text-centered">                      
                    {alertText}
                </div>                      
            </div>
        );
    }
    
    return alertMessage;
}

export default WeatherAlert;