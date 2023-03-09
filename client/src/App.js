import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import './app.scss';
import RegistryOfficeApp from "./components/registry-office-app/RegistryOfficeApp";
import ErrorPage from "./components/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LandingPage from "./components/landing-page/LandingPage";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";
import { Alert, AlertTitle, Snackbar, Stack } from "@mui/material";
import { accountsChange, getUserRegistryOffice } from "./context/utils/ContractsRequests";
import { UserType } from "./context/utils/UserType";
import AdminApp from "./components/admin-app/AdminApp";
import CitizenApp from "./components/citizen-app/CitizenApp";

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
      main: "#4d4595",
      contrastText: "#fff"
    },
  }
});

function App() {

  const { state, dispatch } = useContext(GlobalContext);

  const handleCloseNotification = (index) => {
    dispatch({type: 'CLOSE_NOTIFICATION', payload: index});
  };

  useEffect(() => {
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="app">
          { state.userData.isConnected && 
            <Header />
          }
          <Routes>
              { (!state.userData.isConnected) &&
                <Route path="/" element={<LandingPage />} />
              }
              {/* Only show these routes if user is connected */}
              { (state.userData.isConnected && state.userData.userType === UserType.RegistryOffice) &&
                <Route path="/registry-office" element={<RegistryOfficeApp />} />
              }
              { (state.userData.isConnected && state.userData.userType === UserType.Citizen) &&
                <Route path="/citizen" element={<CitizenApp />} />
              }
              { (state.userData.isConnected && state.userData.userType === UserType.Admin) &&
                <Route path="/admin" element={<AdminApp />} />
              }
              <Route path='/404' element={<ErrorPage />} />
              
              { (!state.userData.isConnected) &&
                <Route path="*" element={<Navigate to="/" replace />}/> 
              }


          </Routes>

          { state.notifications?.notificationsData?.length > 0 && 
            <Stack spacing={2}>
              {state.notifications.notificationsData.map((notificationData, index) => (
                <Snackbar key={index} open={true} autoHideDuration={state.notifications.autoHideDuration} onClose={() => {dispatch({type: 'CLOSE_NOTIFICATION', payload: notificationData.index})}}>
                    <Alert key={index} onClose={() => {dispatch({type: 'CLOSE_NOTIFICATION', payload: notificationData.index})}} severity={notificationData.severity} sx={{ width: '100%' }}>
                    <AlertTitle>{notificationData.title}</AlertTitle>
                        {notificationData.message}
                    </Alert>
                </Snackbar>
              ))}
            </Stack>
          }
          <Footer />
        </div>
      </Router>

    </ThemeProvider>
  );
}

export default App;
