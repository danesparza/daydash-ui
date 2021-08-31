import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react'; // <-- Provider imports 'rollbar' for us

import {useRoutes} from 'hookrouter';
import DashboardHome from './components/DashboardHome';
import NotFound from './components/NotFound';
import Settings from './components/Settings';

//  Global Styles
import 'weathericons/css/weather-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css';
import NavBar from './components/common/NavBar';

const rollbarConfig = {
  accessToken: '10dff9b5e95345cbb9f45bcaadfb2cae',
  environment: 'production',
};

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
      {/* Provider instantiates Rollbar client instance handling any uncaught errors or unhandled promises in the browser */}
      <Provider config={rollbarConfig}>
        {/* ErrorBoundary catches all React errors in the tree below and logs them to Rollbar */}
        <ErrorBoundary>        
          <NavBar/>

          {targetRoute}
        </ErrorBoundary>
      </Provider>
    </React.Fragment>
  );  
}

export default App;
