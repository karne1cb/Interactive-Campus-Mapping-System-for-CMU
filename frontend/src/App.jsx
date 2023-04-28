import './CSS/App.css';
import './CSS/index.css';
import { Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import MapView from './Components/MapView';
import Login from './Components/Login';
import AddLocation from './Components/AddLocation';
import EditLocation from './Components/EditLocation';
import PrivateRoute from './Components/PrivateRoutes';

/**
 * The main app component
 * @returns view of the app
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/AddLoc" element={<PrivateRoute Component={AddLocation}/>} />
          <Route exact path="/EditLoc/*" element={<PrivateRoute Component={EditLocation} />} />
          <Route exact path="" element={<Navigate to="/map" />}/> {/* Redirect to map if no path is specified */}
          <Route exact path="/map" element={<PrivateRoute Component={MapView}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
