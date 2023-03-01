import './CSS/App.css';
import './CSS/index.css';
import { Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import MapView from './Components/MapView';
import Login from './Components/Login';
import NavBar from './Components/SideNavBar';
import AdminTest from './Components/AdminCheck';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/map" element={<MapView />} />
          <Route exact path="/adminTest" element={<AdminTest />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/NavBarTest" element={<NavBar />} />
          <Route exact path="" element={<Navigate to="/map"/>}/> {/* Redirect to map if no path is specified */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
