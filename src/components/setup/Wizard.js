import React, { Component } from 'react';
import QRCode from 'qrcode.react'; // Used in the remote settings link
import StepWizard from "react-step-wizard";

//  APIs
import ConfigAPI from '../../api/config.api';

//  Stores
import SystemStore from '../../stores/SystemStore';
import ConfigStore from '../../stores/ConfigStore';

//  API
import systemApi from '../../api/system.api';

class SetupWizard extends Component {

    constructor(props) {
        super(props);
  
        this.state = {          
            endpoints: SystemStore.GetEndpoints(),
            config: ConfigStore.GetConfig(),
            configLoaded: ConfigStore.HasLoaded(),
            wifiaps: SystemStore.GetWifiAPs(),
            defaultAP: SystemStore.GetHighestQualityAP(),
            selectedAP: "",
            selectedAPPassword: ""
        };
  
      }
  
      _onChange = () => {
        this.setState({          
          endpoints: SystemStore.GetEndpoints(),
          config: ConfigStore.GetConfig(),
          configLoaded: ConfigStore.HasLoaded(),
          wifiaps: SystemStore.GetWifiAPs(),
          defaultAP: SystemStore.GetHighestQualityAP(),
          selectedAP: "", /* Get the stored selected AP */
          selectedAPPassword: "" /* Get the stored password */
        });
      }
  
      componentDidMount() {          
        //  Setup listeners
        this.systemListener = SystemStore.addListener(this._onChange);
        this.configListener = ConfigStore.addListener(this._onChange);
  
        //  Call the method to get Wifi APs
        systemApi.getWifiAPs();
      }  
    
      componentWillUnmount() {      
        this.systemListener.remove();
        this.configListener.remove();
      }
  
      //  A generic change handler, if you need it
      _handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    
        });
      }
  
      //  Form save
      _saveConfig = (e) => {
        e.preventDefault();
  
        //  Validate the zip is numeric
        const parsedZip = parseInt(this.state.zipcode.trim());
        if(isNaN(parsedZip)) {
          //  Display some error?
          console.log("Entered zipcode is not a number");
        }
  
        //  Validate the location looks like it's correct (length > 3 and has a comma)
  
        //  Create a set of config objects
        let config = {
            zipcode: parsedZip,
            useZipcodeForLocation: this.state.zipforlocation,
            radarStation: this.state.radarStation,
            location: this.state.location,
            calendarUrl: this.state.calendarUrl,
            calendarTimezone: this.state.calendarTimezone    
        };
  
        //  Call the REST method to save them
        ConfigAPI.saveConfig(config);
  
        //  Redirect to the main dashboard?
        
      }
  
      //  A generic change handler, if you need it
      _handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value    
        });
      }
  
      render() {
  
        //  Loading placeholder:
        if(!this.state.configLoaded){        
          return(
            <div className="loadContainer">            
                <div className="loading">Loading ...</div>              
            </div>
          );
        }      
        
        //  Format the QR code link:
        const remoteSettingsLink = `${this.state.endpoints.ui}network`;         
        
        //  Sort the APs by name
        const sortedAPs = this.state.wifiaps.sort(function (a, b) {
          if (a.essid < b.essid) {
            return -1;
          }
          if (a.essid > b.essid) {
            return 1;
          }
        
          // names must be equal
          return 0;
        });
  
        //  Format the list of wifi APs:
        const wifiOptions = sortedAPs.map((data) => {
          return <option value={data.essid} key={data.essid}>{data.essid}</option>
        });
  
        //  Get the selected AP (either one that was selected or the default)
        let currentAP = this.state.selectedAP;
        if(currentAP === ""){
          currentAP = this.state.defaultAP;
        }
  
        return (
            <div className="settings">
              <section className="section">
                <div className="container">
                    <StepWizard>
                        <SetupNetwork />
                        <SetupLocation />
                        <SetupCalendar />                
                    </StepWizard>
                </div>
              </section>
            </div>
        );
      }
  }


const SetupNetwork = ({
    currentStep,
    firstStep,
    goToStep,
    lastStep,
    nextStep,
    previousStep,
    totalSteps,
    step,
}) => (
    <div>        
        <div style={{ fontSize: '21px', fontWeight: '200' }}>
            <h4>Setup Network</h4>
            <button className='button is-primary' onClick={nextStep}>Continue</button>
        </div>
    </div>
);

const SetupLocation = ({
    currentStep,
    firstStep,
    goToStep,
    lastStep,
    nextStep,
    previousStep,
    totalSteps,
    step,
}) => (
    <div>
        <div style={{ fontSize: '21px', fontWeight: '200' }}>
            <h4>Setup Location</h4>
            <button className='button' onClick={previousStep}>Back</button>
            <button className='button is-primary' onClick={nextStep}>Continue</button>
        </div>
    </div>
);

const SetupCalendar = ({
    currentStep,
    firstStep,
    goToStep,
    lastStep,
    nextStep,
    previousStep,
    totalSteps,
    step,
}) => (
    <div>
        <div style={{ fontSize: '21px', fontWeight: '200' }}>
            <h4>Setup Calendar</h4>
            <button className='button' onClick={previousStep}>Back</button>
            <button className='button is-primary' onClick={nextStep}>Finish</button>
        </div>
    </div>
);

export default SetupWizard;
  