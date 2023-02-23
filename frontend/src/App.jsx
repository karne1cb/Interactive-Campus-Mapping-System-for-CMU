import './CSS/App.css';
import './CSS/index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MapView from './Components/MapView';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/Map" element={<MapView />} />
          <Route exact path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
