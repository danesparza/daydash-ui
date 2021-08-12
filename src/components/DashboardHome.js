import '../App.css';
import 'weathericons/css/weather-icons.css';
import Clock from './calendar/clock';
import { Component } from 'react';
import PollenStore from '../stores/PollenStore';
import PredominantPollen from './weather/PredominantPollen';

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
            <div className="column has-text-centered currentTempDisplay">              
                <span className="icon">
                  <i className="wi wi-day-sunny"></i>
                </span>              
                &nbsp;&nbsp;84&deg;

                <div className="predomPollen">
                  <PredominantPollen pollen={this.state.pollen} />
                </div>
            </div>
  
            {/* The time and calendar section  */}
            <div className="column has-text-centered currentTimeDisplay">
              <Clock/>
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
