import '../App.css';
import 'weathericons/css/weather-icons.css';

function DashboardHome() {
  return (
    <div className="App">
      <section className="section">
        <div className="container is-fluid">

          <div className="columns">
            
            {/* The weather section  */}
            <div className="column has-text-centered currentTempDisplay">              
                <span className="icon">
                  <i className="wi wi-day-sunny"></i>
                </span>              
                &nbsp;&nbsp;Settings
            </div>
                      
          </div>

        </div>
      </section>
    </div>
  );
}

export default DashboardHome;
