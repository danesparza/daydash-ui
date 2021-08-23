import React, { Component } from 'react';

//  Styles
import '../App.css';

//  Components
import Clock from './calendar/clock';
import DateDisplay from './calendar/datedisplay';
import WeatherBox from './weather/WeatherBox';

//  Stores
import PollenStore from '../stores/PollenStore';
import NewsBox from './news/NewsBox';

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
      <React.Fragment>
        <div className="dashboard">        
        
          <div className="container is-fluid">
    
            {/* Weather and calendar blocks  */}
            <div className="columns">
              
              {/* The weather section  */}
              <div className="column">              
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
        <footer className="dashboardFooter">
          {/* News at the bottom  */}
          <div className="columns">
              <NewsBox/>
          </div>
        </footer>
      </React.Fragment>
      
    );    
  }

  _onChange = () => {
    this.setState({
        pollen: PollenStore.GetPollen(),        
    });
  } 
  
}

export default DashboardHome;
