// import Sidebar from './components/Sidebar';
import { Route } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import Rooms from './pages/Rooms';
// import Bookings from './pages/Bookings';
// import Reviews from './pages/Reviews';

const CMS = () => {
  return (
    <div className="cms">
      {/* <Sidebar /> */}
      {/* <Switch> */}
        <Route path="/dashboard" component={''} />
        <Route path="/rooms" component={''} />
        <Route path="/bookings" component={''} />
        <Route path="/reviews" component={''} />
      {/* </Switch> */}
    </div>
  );
};

export default CMS;
