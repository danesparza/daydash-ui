import React, { Component } from 'react';
import { timeZonesNames } from "@vvo/tzdb";

// import QRCode from 'qrcode.react'; // Used in the remote settings link
import { Wizard, Steps, Step } from 'react-albus';

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
        // const remoteSettingsLink = `${this.state.endpoints.ui}network`;         
        
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

        //  Format the list of timezones:
        const tzOptions = timeZonesNames.map((data, idx) => {
          return <option value={data} key={data}>{data}</option>
        });
  
        return (
            <div className="settings">
              <section className="section">
                <div className="container">
                  <Wizard>
                    <Steps>
                      <Step
                        id="merlin"
                        render={({ next }) => (
                          <div>
                            <div className='content is-large'>
                              <h4>Setup: WiFi Network (step 1 of 3)</h4>
                              <p>DayDash needs to be able to connect to your <b>WiFi network</b> to get information about the weather, calendar events, breaking news, and more.</p>
                              <p>Please pick your WiFi network (and enter your WiFi password if it's required) and then press 'Next'.</p>
                              <div className="select">
                                  <select id="selectedAP" name="selectedAP" value={currentAP} onChange={this._handleInputChange}>                            
                                      {wifiOptions}
                                  </select>
                              </div>                        
                            </div>
                            <div className='content is-large'>
                              <button className='button is-primary' onClick={next}>Next</button>
                            </div>                            
                          </div>
                        )}
                      />
                      <Step
                        id="gandalf"
                        render={({ next, previous }) => (
                          <div>
                            <div className='content is-large'>
                              <h4>Setup: Location (step 2 of 3)</h4>
                              <p>DayDash needs your location for accurate weather information</p>
                              <p>Please enter your zip code:</p>     

                              
                                <div className="field">
                                    <div className="control">
                                        <input className="input wizardZipcode" id="zipLocation" name="zipLocation" value={this.state.zipLocation} onChange={this._handleInputChange} type="text" placeholder="ZIP code"/>                        
                                    </div>
                                </div>
                                
                                <p>Verify your timezone and press 'Next':</p>
                                <div className="field">
                                    <div className="select control">
                                      <select id="tzLocation" name="tzLocation" value={this.state.tzLocation} onChange={this._handleInputChange}>                            
                                        {tzOptions}
                                      </select>                        
                                    </div>
                                </div>
                              
                            </div>
                            <div className='content is-large'>
                              <button className='button' onClick={previous}>Previous</button> &nbsp;
                              <button className='button is-primary' onClick={next}>Next</button>
                            </div>                                                        
                          </div>
                        )}
                      />
                      <Step
                        id="dumbledore"
                        render={({ previous }) => (
                          <div>
                            <div className='content is-large'>
                              <h4>Setup: Calendar (step 3 of 3)</h4>
                              <p>Optional:  You can setup your calendar url now as well</p>
                              <p>When you're done, press 'finish'.</p>

                              <div className="field">
                                  <div className="control">
                                      <input className="input" id="calendarUrl" name="calendarUrl" value={this.state.calendarUrl} onChange={this._handleInputChange} type="text" placeholder="Calendar URL - or leave blank if skipping"/>                        
                                  </div>
                              </div>

                            </div>
                            <div className='content is-large'>
                              <button className='button' onClick={previous}>Previous</button> &nbsp;
                              <button className='button is-primary'>Finish</button>
                            </div>                            
                          </div>
                        )}
                      />
                    </Steps>
                  </Wizard>
                </div>
              </section>
            </div>
        );
      }
  }


export default SetupWizard;
  