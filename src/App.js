import {useRoutes} from 'hookrouter';
import DashboardHome from './components/DashboardHome';
import NotFound from './components/NotFound';
import Settings from './components/Settings';

//  Global Styles
import 'weathericons/css/weather-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css';

const routes = {
  '/': () => <DashboardHome />,
  '/settings': () => <Settings />  
};

const App = () => {
  const routeResult = useRoutes(routes);
    
  return routeResult || <NotFound />;
}

export default App;
