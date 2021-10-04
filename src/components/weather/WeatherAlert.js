import QRCode from 'qrcode.react'; 

function WeatherAlert(props) {

    let alertMessage = "";
    let showAlert = false;

    const currentAlerts = props.alerts.alerts; // Get alerts
    let alertUrl = "";
    let alertText = "";

    //  Wrapped in try/catch just in case
    try{
        if(currentAlerts.length > 0) 
        {
            showAlert = true; // Show the radar image
            alertText = currentAlerts[0].event;
            alertUrl = props.alerts.alertsurl;
        }
    } catch {}        

    if(showAlert){
        alertMessage = (
            <div className="column is-align-self-flex-end">                                                     
                <div className="weatherAlertMessageBody is-warning has-text-right ">                
                    {alertText}
                    <QRCode
                        value={alertUrl}
                        size={45}
                        bgColor={'transparent'}
                        fgColor={"#db9933"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
                        className="weatherAlertQR"
                        />                
                </div>                      
            </div>
        );
    }
    
    return alertMessage;
}

export default WeatherAlert;