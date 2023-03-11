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
import { accountsChange, checkWalletConnected, getUserRegistryOffice, getUsersContract } from "./context/utils/ContractsRequests";
import { UserType } from "./context/utils/UserType";
import AdminApp from "./components/admin-app/AdminApp";
import CitizenApp from "./components/citizen-app/CitizenApp";
import LoaderSpinner from "./components/LoaderSpinner";

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

  const [isLoading, setIsLoading] = useState(true);

  const apps = [
    {
      appId: 0,
      appName: 'Landing Page'
    },
    {
      appId: 1,
      appName: 'Citizen App'
    },
    {
      appId: 2,
      appName: 'Registration Office App'
    },
    {
      appId: 3,
      appName: 'Admin App'
    }
  ]

  const { state, dispatch } = useContext(GlobalContext);

  const handleCloseNotification = (index) => {
    dispatch({type: 'CLOSE_NOTIFICATION', payload: index});
  };

  useEffect(() => {
    // CHECK if user is connected
    (async function () {
      const accountsConnected = await checkWalletConnected();
      if (accountsConnected.length > 0) {
        let accountPublicAddress = accountsConnected[0];
        const contract = await getUsersContract();
        const user = await contract.getUser(accountPublicAddress);
        let data;
        let userCategory;
        
        if (user.exists) {
          switch (user.userType) {
            case UserType.RegistryOffice:
              userCategory = user.userType;
              data = await contract.getRegistryOffice(accountPublicAddress);
              break;
            case UserType.Citizen:
              userCategory = user.userType;
              data = await contract.getCitizen(accountPublicAddress);
              break;
            case UserType.Admin:
              userCategory = user.userType;
              data = await contract.getAdmin(accountPublicAddress);
              break;
            default:
              break;
          }
          console.log(data);
          dispatch({type: 'SET_USER_DATA', payload: {isConnected: user.exists, userType: userCategory, publicAddress: accountPublicAddress, data: data}});
          setIsLoading(false);
        } 
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
      }
      )();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {
        isLoading ?  
        <div className="app-content">
            <LoaderSpinner />
        </div> 
        : 
      <Router>
        <div className="app">
          { state.userData.isConnected && 
            <Header />
          }
          <Routes>
              { (!state.userData.isConnected) &&
                <Route path="/" element={<LandingPage />} />
              }
              { (state.userData.isConnected && state.userData.userType === UserType.RegistryOffice) &&
                <Route path="/registry-office" element={<RegistryOfficeApp />} />
              }
              { (state.userData.isConnected && state.userData.userType === UserType.RegistryOffice) &&
                <Route path="*" element={<Navigate to="/registry-office" replace />}/>
              }
              { (state.userData.isConnected && state.userData.userType === UserType.Citizen) &&
                <Route path="/citizen" element={<CitizenApp />} />
              }
              { (state.userData.isConnected && state.userData.userType === UserType.Citizen) &&
                <Route path="*" element={<Navigate to="/citizen" replace />}/>
              }
              { (state.userData.isConnected && state.userData.userType === UserType.Admin) &&
                <Route path="/admin" element={<AdminApp />} />
              }
              { (state.userData.isConnected && state.userData.userType === UserType.Admin) &&
                <Route path="*" element={<Navigate to="/admin" replace />}/>
              }
              <Route path='/404' element={<ErrorPage />} />
              { (!state.userData.isConnected) &&
                <Route path="*" element={<Navigate to="/404" replace />}/>
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
      }

    </ThemeProvider>
  );
}

export default App;
