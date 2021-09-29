
function NotFound() {
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
                &nbsp;&nbsp;Sorry -- I couldn't find that page
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

export default NotFound;
