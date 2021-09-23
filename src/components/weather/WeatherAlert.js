import QRCode from 'qrcode.react'; 

function WeatherAlert(props) {

    let alertMessage = "";
    let showAlert = false;

    const currentAlerts = props.alerts.alerts; // Get alerts
    const alertUrl = props.alerts.alertsurl;

    if(currentAlerts.length > 0) 
    {
        showAlert = true; // Show the radar image
    }    

    if(showAlert){
        alertMessage = (
            <div className="column">                                                     
                <div className="notification is-link">                
                    <QRCode
                        value={alertUrl}
                        size={40}
                        bgColor={'transparent'}
                        fgColor={"#fff"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
                        className="weatherAlertQR"
                        />

                    <strong>{currentAlerts[0].event}</strong>                
                </div>                      
            </div>
        );
    }
    
    return alertMessage;
}

export default WeatherAlert;