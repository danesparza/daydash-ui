import ago from 's-ago';

function WeatherAlert(props) {

    let alertMessage = "";
    let showAlert = false;

    const currentAlerts = props.alerts.alerts; // Get alerts    
    let alertText = "";
    let alertTime = "";
    let alertTimeText = "";

    //  Wrapped in try/catch just in case
    try{
        if(currentAlerts.length > 0) 
        {   
            showAlert = true; // Show the alert         
            alertText = currentAlerts[0].event;
            const parsedAlertTime = Date.parse(currentAlerts[0].end);
            alertTime = new Date(parsedAlertTime);
            alertTimeText = "ends " + ago(alertTime);                       
        }
    } catch {}        

    if(showAlert){
        alertMessage = (
            <div className="column">                                                     
                <div className="weatherAlertMessageBody has-text-centered">                      
                    {alertText} {alertTimeText}
                </div>                      
            </div>
        );
    }
    
    return alertMessage;
}

export default WeatherAlert;