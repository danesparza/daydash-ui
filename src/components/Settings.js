import React, { Component } from 'react';
import QRCode from 'qrcode.react'; // Used in the weather notification.  We can move that to its own component

//  Stores
import SystemStore from '../stores/SystemStore';
import ConfigStore from '../stores/ConfigStore';

//  Styles and icons
import '../App.css';
import 'weathericons/css/weather-icons.css';

class Settings extends Component {

  constructor(props) {
      super(props);

      this.state = {          
          endpoints: SystemStore.GetEndpoints(),
          config: ConfigStore.GetAllConfigs(),
          zipcode: ConfigStore.GetZipcode()
          /* 
          Initially, these come from config.
          When a user interacts with the zipcode field and has the 'get location from zipcode' option selected,
          the location needs to be updated.  It will look something like this:

          zipcode (onchange) -> api call (new zipcode) -> action -> settings page store -> this page (with its own listener for settings page store changes)

          latitude: ConfigStore.GetLatitude(),
          longitude: ConfigStore.GetLongitude(),
          */
      };

    }

    _onChange = () => {
      this.setState({          
          endpoints: SystemStore.GetEndpoints(),
          config: ConfigStore.GetAllConfigs(),
          zipcode: ConfigStore.GetZipcode()
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

      //  Update the coordinates:

    }

    //  Form save
    _saveConfig = (e) => {
      e.preventDefault();    
      console.log('You clicked submit.');

      //  Create a set of config objects

      //  Call the REST method to save them

    }

    render() {

      //  Format the item image url:
      const lat = "33.610739" /*props.item.geometry.coordinates[1]*/;
      const long = "-111.891472" /*props.item.geometry.coordinates[0]*/;
      const zoom = "11";
      const fmtImageURL = `//${this.state.endpoints.service}/v1/image/map/${lat},${long}/${zoom}`; // We need to construct this url using what the server indicates is its remote IP

      //  Get the radar location:
      const radarLocation = "csg";

      //  Format the url
      const imageHash0 = new Date().toLocaleDateString("en-US", {day: 'numeric'});
      const imageHash1 = new Date().toLocaleTimeString("en-US", {hour12 : false, hour:  "numeric" });
      const imageHash2 = new Date().toLocaleTimeString("en-US", {hour12 : false, minute: "numeric" });
      const imageHash = imageHash0 + "" + imageHash1 + "" + imageHash2.substring(0, imageHash2.length -1); // We're doing this to force no image caching -- time boxed to 10 minutes
      const radarUrl = `https://s.w-x.co/staticmaps/wu/wxtype/county_loc/${radarLocation}/animate.png?${imageHash}`

      return (
        <div className="App">
          <section className="section">
            <div className="container">

              <div className="columns">
                <div className="column is-narrow is-hidden-mobile">
                  <QRCode
                    value={"http://10.0.1.220:3005/settings"}
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
                    <a>
                      <span className="icon is-small"><i className="fas fa-tools" aria-hidden="true"></i></span>
                      <span>General</span>
                    </a>
                  </li>
                  <li>
                    <a>
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
                        <input className="input" name="zipcode" value={this.state.zipcode} type="text" placeholder="Enter ZIP code" onChange={this._handleInputChange}/>                        
                      </div>
                    </div>               

                    <p className="content">We use your <strong>location</strong> to get local weather and weather alerts information.</p>
                    
                    <div className="control">
                      <label className="radio">
                        <input type="radio" name="zipforlocation" value="true" defaultChecked="true" onChange={this._handleInputChange} /> Use zipcode for location
                      </label>
                      <label className="radio">
                        <input type="radio" name="zipforlocation" value="false" onChange={this._handleInputChange} /> Enter custom location
                      </label>
                    </div>

                    <div className="field mt-4">
                      <label className="label">Location</label>
                      <div className="control">
                        <input className="input" type="text" placeholder="latitude,longitude" disabled/>
                      </div>
                    </div>
                    
                  </div>

                  <div className="column">
                    <p className="content">A map of the location you entered:</p>
                    <img src={fmtImageURL} alt=""/>
                  </div>

                </div>           

                <hr />
                <h2 className="subtitle">Calendar information</h2>
                <div className="field">
                  <label className="label">Calendar URL</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="Enter calendar URL"/>
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

                          <select id="radarStation">
                            
                            <option value="usa" selected="selected">United States</option>
                            
                            <option value="prc" selected="">AZ - Prescott </option>
                            <option value="lit" selected="">AR - Little Rock </option>
                            <option value="bfl" selected="">CA - Bakersfield </option>
                            <option value="den" selected="">CO - Denver </option>
                            <option value="hfd" selected="">CT - Hartford </option>
                            <option value="eyw" selected="">FL - Key West </option>
                            <option value="pie" selected="">FL - Saint Petersburg</option>

                            <option value="csg" selected="">GA - Columbus </option>
                            <option value="dsm" selected="">IA - Des Moines </option>
                            <option value="myl" selected="">ID - McCall </option>
                            <option value="spi" selected="">IL - Springfield </option>
                            <option value="sln" selected="">KS - Salina </option>
                            <option value="bwg" selected="">KY - Bowling Green </option>
                            <option value="msy" selected="">LA - New Orleans </option>

                            <option value="cad" selected="">MI - Cadillac </option>
                            <option value="jef" selected="">MO - Jefferson City </option>
                            <option value="stc" selected="">MN - Saint Cloud </option>
                            <option value="tvr" selected="">MS - Vicksburg </option>
                            <option value="lwt" selected="">MT - Lewistown </option>

                            <option value="clt" selected="">NC - Charlotte </option>
                            <option value="bis" selected="">ND - Bismarck </option>
                            <option value="lbf" selected="">NE - North Platte </option>
                            <option value="bml" selected="">NH - Berlin </option>
                            <option value="row" selected="">NM - Roswell </option>
                            <option value="rno" selected="">NV - Reno </option>
                            <option value="bgm" selected="">NY - Binghamton </option>  

                            <option value="day" selected="">OH - Dayton </option>
                            <option value="law" selected="">OK - Lawton </option>
                            <option value="rdm" selected="">OR - Redmond </option>
                            <option value="pir" selected="">SD - Pierre </option>
                            <option value="bro" selected="">TX - Brownsville </option>                                                
                            <option value="sat" selected="">TX - San Antonio </option>

                            <option value="pvu" selected="">UT - Provo </option>
                            <option value="fcx" selected="">VA - Roanoke </option>                        
                            <option value="shd" selected="">VA - Staunton </option>
                            <option value="tiw" selected="">WA - Tacoma </option>
                            <option value="riw" selected="">WY - Riverton </option>
                            
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="column">
                    <p className="content">The current radar image for the selected radar station:</p>
                    <img src={radarUrl} alt=""/>
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

export default Settings;
