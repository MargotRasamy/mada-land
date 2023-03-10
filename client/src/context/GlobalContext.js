import { useReducer, createContext } from "react";
import { notificationsReducer } from "./reducers/NotificationsReducer";
import { registryOfficesReducer } from "./reducers/RegistryOfficesReducer";
import { userReducer } from "./reducers/UserReducer";
import { checkUserConnected } from "./utils/ContractsRequests";
import { UserType } from "./utils/UserType";

// initial state
const initialState = {
    userData : {
        userType: 0,
        isConnected: false,
        data: {},
        publicAddress: ''
    },
    registryOffices: [],
    notifications: {
      autoHideDuration : 4000,
      notificationsData : [
      ]
    },
    mainPages : {
      mainHome: '/',
      registryOffice: '/registry-office',
      citizen: '/citizen',
      admin: '/admin'
    }
};

// Create context
const GlobalContext = createContext({});

// Combine reducer function
const combineReducers = (...reducers) => (state, action) => {
  for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action);
  return state;
};

// Context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers(userReducer, notificationsReducer, registryOfficesReducer), initialState);
  const value = { state, dispatch };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export { GlobalContext, Provider };