import React, { Component } from 'react';
import QRCode from 'qrcode.react'; // Used in the weather notification.  We can move that to its own component
import ZipToGeo from '../utility/ziptogeo';

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
          zipcode: ConfigStore.GetZipcode(),
          zipforlocation: "true",
          latitude: ConfigStore.GetLatitude(),
          longitude: ConfigStore.GetLongitude(),
          radarLocation: ConfigStore.GetRadarLocation()          
      };

    }

    _onChange = () => {
      this.setState({          
          endpoints: SystemStore.GetEndpoints(),
          config: ConfigStore.GetAllConfigs(),
          zipcode: ConfigStore.GetZipcode(),
          latitude: ConfigStore.GetLatitude(),
          longitude: ConfigStore.GetLongitude(),
          radarLocation: ConfigStore.GetRadarLocation()
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
      if(target.value.length === 5 && this.state.zipforlocation === "true"){
        try {
          let lat, long;
          ({lat, long} =  ZipToGeo(target.value));

          //  Update the state for latitude and longitude here (the map should redraw)
          this.setState({
            latitude : lat,
            longitude: long
          });
        } catch {}                
      }                  

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
      const zoom = "11";
      const fmtImageURL = `//${this.state.endpoints.service}/v1/image/map/${this.state.latitude},${this.state.longitude}/${zoom}`; // We need to construct this url using what the server indicates is its remote IP

      //  Format the url
      let radarUrl = `https://s.w-x.co/staticmaps/wu/wxtype/county_loc/${this.state.radarLocation}/animate.png`;
      if(this.state.radarLocation === "usa") {
        //  The 'USA' url gets formatted differently
        radarUrl = "https://s.w-x.co/staticmaps/wu/wxtype/none/usa/animate.png";
      }

      //  Format the location:
      const fmtLocation = `${this.state.latitude},${this.state.longitude}`;

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
                        <input className="input" name="zipcode" value={this.state.zipcode} type="text" placeholder="Enter ZIP code" onChange={this._zipChange}/>                        
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
                        <input className="input" type="text" placeholder="latitude,longitude" value={fmtLocation} disabled/>
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

                          <select id="radarLocation" name="radarLocation" value={this.state.radarLocation} onChange={this._handleInputChange}>
                            
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
