

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
        
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        
          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item" href="/settings">
                Settings
              </a>        
            </div>
          </div>
        </nav>
    );
}

export default NavBar;