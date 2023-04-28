import './CSS/App.css';
import './CSS/index.css';
import { Route, BrowserRouter as Router, Routes, Navigate, Switch } from 'react-router-dom';
import MapView from './Components/MapView';
import Login from './Components/Login';
import AdminTest from './Components/AdminCheck';
import AddLocation from './Components/AddLocation';
import EditLocation from './Components/EditLocation';
import PrivateRoute from './Components/PrivateRoutes';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Hides the search bar and navbar when on the login screen. */}
        <Routes>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/AddLoc" element={<PrivateRoute Component={AddLocation}/>} />
          <Route exact path="/EditLoc/*" element={<PrivateRoute Component={EditLocation} />} />
          <Route exact path="" element={<Navigate to="/map" />}/> {/* Redirect to map if no path is specified */}
          <Route exact path="/map" element={<PrivateRoute Component={MapView}/>} />
          <Route exact path="/adminTest" element={<AdminTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
