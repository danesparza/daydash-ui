import React from 'react';

import {useRoutes} from 'hookrouter';
import DashboardHome from './components/DashboardHome';
import NotFound from './components/NotFound';
import Settings from './components/Settings';

//  Global Styles
import 'weathericons/css/weather-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css';
import NavBar from './components/common/NavBar';

//  Our routes
const routes = {
  '/': () => <DashboardHome />,
  '/settings': () => <Settings />  
};

const App = () => {
  const routeResult = useRoutes(routes);

  //  Determine our target page or use the 'not found' page 
  let targetRoute = routeResult || <NotFound />; 

  //  Return the navbar and our target route
  return (
    <React.Fragment>
      <NavBar/>

      {targetRoute}
    </React.Fragment>
  );  
}

export default App;
