import ago from 's-ago';

function WeatherAlert(props) {
        
    let alertMessage = "";
    let showAlert = false;

    const dtNow = new Date();
    const currentAlerts = props.alerts.alerts; // Get alerts    
    // Get alerts that end after right now
    const upcomingEvents = currentAlerts.filter(item => Date.parse(item.end) > dtNow);

    let alertText = "";
    let alertTime = "";
    let alertTimeText = "";

    //  Wrapped in try/catch just in case
    try{
        if(upcomingEvents.length > 0) 
        {               
            showAlert = true; // Show the alert         
            alertText = upcomingEvents[0].event;
            const parsedAlertTime = Date.parse(upcomingEvents[0].end);
            alertTime = new Date(parsedAlertTime);
            alertTimeText = "ends " + ago(alertTime);                       
        }
    } catch(e) {
        console.log(e);
    }        

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