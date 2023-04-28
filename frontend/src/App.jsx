import './CSS/App.css';
import './CSS/index.css';
import { Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import MapView from './Components/MapView';
import Login from './Components/Login';
import AdminTest from './Components/AdminCheck';
import AddLocation from './Components/AddLocation';
import EditLocation from './Components/EditLocation';


function App() {
  return (
    <Router>
      <div className="App">
      {/* Hides the search bar and navbar when on the login screen. */}
        <Routes>
          <Route exact path="/map" element={<MapView />} />
          <Route exact path="/adminTest" element={<AdminTest />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/AddLoc" element={<AddLocation />} />
          <Route exact path="/EditLoc/*" element={<EditLocation/>} />
          <Route exact path="" element={<Navigate to="/map"/>}/> {/* Redirect to map if no path is specified */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
