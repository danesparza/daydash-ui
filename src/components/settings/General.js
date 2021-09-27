import React, { Component } from 'react';
import QRCode from 'qrcode.react'; // Used in the weather notification.  We can move that to its own component
import ZipToGeo from '../../utility/ziptogeo';
import { timeZonesNames } from "@vvo/tzdb";
import tzlookup from 'tz-lookup';

//  APIs
import ConfigAPI from '../../api/config.api';

//  Stores
import SystemStore from '../../stores/SystemStore';
import ConfigStore from '../../stores/ConfigStore';

//  Styles and icons
import 'weathericons/css/weather-icons.css';

class GeneralSettings extends Component {

  constructor(props) {
      super(props);

      this.state = {          
          endpoints: SystemStore.GetEndpoints(),
          config: ConfigStore.GetConfig(),
          configLoaded: ConfigStore.HasLoaded(),
          zipcode: (ConfigStore.GetConfig().zipcode === 0 ? "" : ConfigStore.GetConfig().zipcode.toString()),
          zipforlocation: ConfigStore.GetConfig().useZipcodeForLocation,
          radarStation: ConfigStore.GetConfig().radarStation,
          calendarUrl: ConfigStore.GetConfig().calendarUrl,
          calendarTimezone: ConfigStore.GetConfig().calendarTimezone,
          location: ConfigStore.GetConfig().location
      };

    }

    _onChange = () => {
      this.setState({          
        endpoints: SystemStore.GetEndpoints(),
        config: ConfigStore.GetConfig(),
        configLoaded: ConfigStore.HasLoaded(),
        zipcode: (ConfigStore.GetConfig().zipcode === 0 ? "" : ConfigStore.GetConfig().zipcode.toString()),
        zipforlocation: ConfigStore.GetConfig().useZipcodeForLocation,
        radarStation: ConfigStore.GetConfig().radarStation,
        calendarUrl: ConfigStore.GetConfig().calendarUrl,
        calendarTimezone: ConfigStore.GetConfig().calendarTimezone,
        location: ConfigStore.GetConfig().location
      });
    }

    componentDidMount() {          
      this.systemListener = SystemStore.addListener(this._onChange);
      this.configListener = ConfigStore.addListener(this._onChange);
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

    //  Change handler for zipcode.  Refreshes the map if there are exactly 5 digits entered
    _zipChange = (event) => {
      const target = event.target;
      
      //  Update the local state
      this.setState({
        zipcode : target.value
      });

      //  Update the coordinates if we have a 5 digit zip and we're using zip for location:      
      if(target.value.length === 5 && this.state.zipforlocation === true){
        try {
          let lat, long;
          ({lat, long} =  ZipToGeo(target.value));

          const updatedTZ = tzlookup(lat, long);

          //  Update the state for latitude and longitude here (the map should redraw)
          //  ...also update the calendar timezone

          this.setState({
            location: `${lat},${long}`,
            calendarTimezone: updatedTZ
          });
        } catch(err) {
          console.log(err);
        }                
      }                  

    }

    //  Change handler for location
    _locationChange = (event) => {
      const target = event.target;

      //  Format the value:
      try {
        let formattedLocation = target.value;

        //  Update the local state
        this.setState({
          location : formattedLocation
        });
        
      } catch {}            

    }

    _zipForLocationChange = (event) => {
      const target = event.target;

      //  Parse the value:
      try {
        const useZipForLocation = target.value ? (target.value.toLowerCase() == "true") : false;

        //  Update the local state
        this.setState({
          zipforlocation : useZipForLocation
        });
        
      } catch {}
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
      setTimeout(function(){
        window.location.href = "/";
      }, 2000);
    }

    render() {

      //  Loading placeholder:
      if(!this.state.configLoaded){        
        return(
          <div className="loadContainer">            
              <div className="loading">
              
              <div className="sk-grid">
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
                <div className="sk-grid-cube"></div>
              </div>

              
              </div>              
          </div>
        );
      }

      //  Format the item image url:
      const zoom = "11";
      const fmtImageURL = `//${this.state.endpoints.service}/v1/image/map/${this.state.location}/${zoom}`; 

      //  Format the url
      let radarUrl = `https://s.w-x.co/staticmaps/wu/wxtype/county_loc/${this.state.radarStation}/animate.png`;
      if(this.state.radarStation === "usa") {
        //  The 'USA' url gets formatted differently
        radarUrl = "https://s.w-x.co/staticmaps/wu/wxtype/none/usa/animate.png";
      }

      //  Format the list of timezones:
      const tzOptions = timeZonesNames.map((data, idx) => {
        return <option value={data} key={data}>{data}</option>
      });
      
      //  Format the QR code link:
      const remoteSettingsLink = `${this.state.endpoints.ui}settings`;      

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
                  <li className="is-active">
                    <a href="/settings">
                      <span className="icon is-small"><i className="fas fa-tools" aria-hidden="true"></i></span>
                      <span>General</span>
                    </a>
                  </li>
                  <li>
                    <a href="/network">
                      <span className="icon is-small"><i className="fas fa-wifi" aria-hidden="true"></i></span>
                      <span>Network</span>
                    </a>
                  </li>
                </ul>
              </div>

              <form className="box" onSubmit={this._saveConfig}>           

                <div className="columns">
                  
                  <div className="column">     
                    <h2 className="subtitle">Zipcode and location</h2>         
                    <p className="content">We use your <strong>zipcode</strong> to get up-to-date pollen information.  You can also use it to look up your <strong>location</strong>, below.</p>

                    
                    <div className="field">
                      <label className="label">Zipcode</label>  
                      <div className="control">
                        <input className="input" name="zipcode" value={this.state.zipcode} type="text" placeholder="Enter ZIP code" onChange={this._zipChange}/>                        
                      </div>
                    </div>               

                    <p className="content">We use your <strong>location</strong> to get local weather and weather alerts information.</p>
                    
                    <div className="control">
                      <label className="radio">
                        <input type="radio" name="zipforlocation" value="true" defaultChecked="true" onChange={this._zipForLocationChange} /> Use zipcode for location
                      </label>
                      <label className="radio">
                        <input type="radio" name="zipforlocation" value="false" onChange={this._zipForLocationChange} /> Enter custom location
                      </label>
                    </div>

                    <div className="field mt-4">
                      <label className="label">Location</label>
                      <div className="control">
                        <input className="input" type="text" placeholder="latitude,longitude" value={this.state.location} disabled={this.state.zipforlocation === true ? true : false} onChange={this._locationChange}/>
                      </div>
                    </div>
                    
                  </div>

                  <div className="column">
                    <p className="content">A map of the location you entered:</p>
                    <img className="settingsMapImage" src={fmtImageURL} alt=""/>
                  </div>

                </div>           

                <hr />
                
                <h2 className="subtitle">Calendar information</h2>
                <p className="content">Your <strong>Calendar URL</strong> is used to show today's events from any calendar you choose.  Help getting this url from <a href="https://support.google.com/calendar/answer/37648?hl=en&ref_topic=10509542#zippy=%2Cget-your-calendar-view-only" target="_blank" rel="noreferrer">Google Calendar</a> or <a href="https://www.techrepublic.com/article/how-to-find-your-icloud-calendar-url/" target="_blank" rel="noreferrer">iCloud Calendar</a> or <a href="https://support.microsoft.com/en-us/office/share-your-calendar-in-outlook-on-the-web-7ecef8ae-139c-40d9-bae2-a23977ee58d5" target="_blank" rel="noreferrer">Outlook</a>.</p>
                <div className="field">
                  <label className="label">Calendar URL</label>
                  <div className="control">
                    <input className="input" name="calendarUrl" type="url" placeholder="Enter calendar URL" value={this.state.calendarUrl} onChange={this._handleInputChange} />
                  </div>
                </div>
                <div className="field mt-4">
                  <label className="label">Timezone</label>
                  <div className="select">
                    <select id="calendarTimezone" name="calendarTimezone" value={this.state.calendarTimezone} onChange={this._handleInputChange}>                            
                      {tzOptions}
                    </select>
                  </div>
                </div>

                <hr/>

                <div className="columns">
                  
                  <div className="column">   
                    <h2 className="subtitle">Weather radar</h2>
                    <p className="content">When a storm is approaching, a weather radar image will be displayed.  The radar image will be based on your preferred weather radar station.</p>

                    <div className="field">
                      <label className="label">Preferred weather radar station</label>
                      <div className="control">
                        <div className="select">

                          <select id="radarStation" name="radarStation" value={this.state.radarStation} onChange={this._handleInputChange}>
                            
                            <option value="usa">All United States</option>
                            
                            <option value="prc">AZ - Prescott </option>
                            <option value="lit">AR - Little Rock </option>
                            <option value="bfl">CA - Bakersfield </option>
                            <option value="den">CO - Denver </option>
                            <option value="hfd">CT - Hartford </option>
                            <option value="eyw">FL - Key West </option>
                            <option value="pie">FL - Saint Petersburg</option>

                            <option value="csg">GA - Columbus </option>
                            <option value="dsm">IA - Des Moines </option>
                            <option value="myl">ID - McCall </option>
                            <option value="spi">IL - Springfield </option>
                            <option value="sln">KS - Salina </option>
                            <option value="bwg">KY - Bowling Green </option>
                            <option value="msy">LA - New Orleans </option>

                            <option value="cad">MI - Cadillac </option>
                            <option value="jef">MO - Jefferson City </option>
                            <option value="stc">MN - Saint Cloud </option>
                            <option value="tvr">MS - Vicksburg </option>
                            <option value="lwt">MT - Lewistown </option>

                            <option value="clt">NC - Charlotte </option>
                            <option value="bis">ND - Bismarck </option>
                            <option value="lbf">NE - North Platte </option>
                            <option value="bml">NH - Berlin </option>
                            <option value="row">NM - Roswell </option>
                            <option value="rno">NV - Reno </option>
                            <option value="bgm">NY - Binghamton </option>  

                            <option value="day">OH - Dayton </option>
                            <option value="law">OK - Lawton </option>
                            <option value="rdm">OR - Redmond </option>
                            <option value="pir">SD - Pierre </option>
                            <option value="bro">TX - Brownsville </option>                                                
                            <option value="sat">TX - San Antonio </option>

                            <option value="pvu">UT - Provo </option>
                            <option value="fcx">VA - Roanoke </option>                        
                            <option value="shd">VA - Staunton </option>
                            <option value="tiw">WA - Tacoma </option>
                            <option value="riw">WY - Riverton </option>
                            
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="column">
                    <p className="content">The current radar image for the selected radar station:</p>
                    <img className="settingsMapImage" src={radarUrl} alt=""/>
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

export default GeneralSettings;
