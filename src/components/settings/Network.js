import React, { Component } from 'react';
import QRCode from 'qrcode.react'; // Used in the remote settings link

//  APIs
import ConfigAPI from '../../api/config.api';

//  Stores
import SystemStore from '../../stores/SystemStore';
import ConfigStore from '../../stores/ConfigStore';

//  API
import systemApi from '../../api/system.api';

//  Styles and icons
import 'weathericons/css/weather-icons.css';

class NetworkSettings extends Component {

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

              <div className="columns">
                <div className="column is-narrow is-hidden-mobile">
                  <QRCode
                    value={remoteSettingsLink}
                    size={60}
                    bgColor={'transparent'}
                    fgColor={"#363636"}
                    level={"L"}
                    includeMargin={false}
                    renderAs={"svg"}
                    />                 
                </div>
                <div className="column settingsTitle">
                  <h1 className="title">Daydash settings</h1>
                  <h2 className="subtitle is-hidden-mobile">Use the QR code to access remotely</h2>
                </div>
              </div>                 

              <div className="tabs is-boxed is-medium">
                <ul>
                  <li>
                    <a href="/settings">
                      <span className="icon is-small"><i className="fas fa-tools" aria-hidden="true"></i></span>
                      <span>General</span>
                    </a>
                  </li>
                  <li className="is-active">
                    <a href="/network">
                      <span className="icon is-small"><i className="fas fa-wifi" aria-hidden="true"></i></span>
                      <span>Network</span>
                    </a>
                  </li>
                </ul>
              </div>

              <form className="box" onSubmit={this._saveConfig}>           

                <h2 className="subtitle">Network settings</h2>
                <p className="content">Select your WiFi network (and enter a password if necessary).  This is used to connect to the internet and get weather, news and calendar information for your Dashboard</p>         
              
                <div className="field mt-4">
                  <label className="label">Wifi Access Point</label>
                  <div className="select">
                    <select id="selectedAP" name="selectedAP" value={currentAP} onChange={this._handleInputChange}>                            
                      {wifiOptions}
                    </select>
                  </div>
                </div>

                <div className="field mt-4">
                  <label className="label">Password</label>
                  <div className="control">
                    <input className="input" id="selectedAPPassword" name="selectedAPPassword" type="password" placeholder="password" value={this.state.selectedAPPassword} onChange={this._handleInputChange}/>
                  </div>
                </div>

                <button className="button is-primary" type="submit">Save</button>
                  
              </form>

            </div>
          </section>
        </div>
      );
    }
}

export default NetworkSettings;
