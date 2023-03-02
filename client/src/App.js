import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './app.scss';
import LandingPage from "./components/landing-page/LandingPage";
import ErrorPage from "./components/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2acc8e"
    },
    secondary: {
      main: "#4d4595"
    },
    header: {
      main: "#EDEDED"
    },
    buttonMain: {
      main: "#4d7df7",
      contrastText: "#fff"
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app">
          <Header />
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path='/404' element={<ErrorPage />} />
              <Route path="*" element={<Navigate to="/404" replace />}/> 
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
