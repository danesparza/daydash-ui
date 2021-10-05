import React, { Component } from 'react';

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
        hidenav: true        
    };

  }  

  componentDidMount() {    
    //  Track window mouse movement:
    this.mouseTracker = window.addEventListener("mousemove", this._onMouseMove);    
  }  

  componentWillUnmount() {
    try{
      //  Remove the mouse tracker:
      this.mouseTracker.remove();
    } catch {}        
  }

  _onMouseMove = () => {
    // Fired when mosue moved.  We can make sure the nave is shown and/or reset the 'hide nav' timer.
    this.setState({
      hidenav: false
    });

    //  Clear the timer if it exists ... 
    try{
      clearTimeout(this.timeout);      
    } catch {}

    //  Set the timeout for 5 seconds:
    this.timeout = setTimeout(this.hideNav, 5000);
  }

  hideNav = () => {
    this.setState({
      hidenav: true
    });
  }

  render() {

    //  Decide what styles we need to add based on mouse state:

    return (
      <nav className={`${this.state.hidenav ? "hide-nav navbar is-dark" : "navbar is-dark"}`} role="navigation" aria-label="main navigation">
          <div className="navbar-brand">        
            <a className="navbar-item" href="/">
              <span className="icon-text">
                <span className="icon">
                  <i className="fab fa-cloudversify"/>
                </span>
                <span>Daydash</span>
              </span>
            </a>

            <a className="navbar-item" href="/settings">
              Settings
            </a>                              
          </div>                          
        </nav>
    );
  }

}

export default NavBar;