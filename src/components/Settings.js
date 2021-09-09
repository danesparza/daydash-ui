import QRCode from 'qrcode.react'; // Used in the weather notification.  We can move that to its own component

//  Styles and icons
import '../App.css';
import 'weathericons/css/weather-icons.css';

function Settings() {

  //  Need to switch to component model so we can fetch from a store

   //  Format the item image url:
   const lat = "33.610739" /*props.item.geometry.coordinates[1]*/;
   const long = "-111.891472" /*props.item.geometry.coordinates[0]*/;
   const zoom = "11";
   const fmtImageURL = `http://localhost:3010/v1/image/map/${lat},${long}/${zoom}`;

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
            <div className="column is-narrow">
              <QRCode
                value={"http://localhost:3005/settings/"}
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
              <h2 className="subtitle">Use the QR code to access remotely</h2>
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

          <form className="box">            

            <div className="columns">
              
              <div className="column">      
                <h2 className="subtitle">Zipcode and location</h2>          
                <p className="content">We use your <strong>zipcode</strong> to get up-to-date pollen information.  You can also use it to look up your <strong>location</strong>, below.</p>

                <div className="field">
                  <label className="label">Zipcode</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="Enter ZIP code"/>
                  </div>
                </div>                

                <div className="field">
                  <label className="label">Location (as lat,long)</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="Enter lat,long"/>
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
                      <select>
                        <option>Select dropdown</option>
                        <option>With options</option>
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

            <button className="button is-primary">Save</button>
          </form>

        </div>
      </section>
    </div>
  );
}

export default Settings;
