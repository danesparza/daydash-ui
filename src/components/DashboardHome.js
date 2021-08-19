import { Component } from 'react';

//  Components
import Clock from './calendar/clock';
import DateDisplay from './calendar/datedisplay';
import WeatherBox from './weather/WeatherBox';

//  Stores
import PollenStore from '../stores/PollenStore';

class DashboardHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
        pollen: PollenStore.GetPollen(),        
    };
  }

  componentDidMount() {    
    //  Add store listeners ... and notify ME of changes
    this.pollenListener = PollenStore.addListener(this._onChange);    
  }

componentWillUnmount() {
    this.pollenListener.remove();    
  }

  render() {

    return (
      <div className="App">
        
        <div className="container is-fluid">
  
          <div className="columns">
            
            {/* The weather section  */}
            <div className="column weatherContainer">              
                <WeatherBox />
            </div>
  
            {/* The time and calendar section  */}
            <div className="column has-text-centered">
              <div className="currentTimeDisplay">
                <Clock/>
              </div>
              <div className="currentDateDisplay">
                <DateDisplay/>
              </div>
              
            </div>                      
          </div>
  
        </div>
        
      </div>
    );    
  }

  _onChange = () => {
    this.setState({
        pollen: PollenStore.GetPollen(),        
    });
  } 
  
}

export default DashboardHome;
