import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './app.scss';
import LandingPage from "./components/landing-page/LandingPage";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/404' element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/404" replace />}/> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
