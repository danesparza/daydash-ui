

function NavBar(props) {
    
    return(
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">        
            <a className="navbar-item" href="/">
              <span className="icon-text">
                <span className="icon">
                  <i className="fab fa-cloudversify"></i>
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

export default NavBar;