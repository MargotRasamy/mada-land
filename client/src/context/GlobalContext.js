import { useReducer, createContext } from "react";
import { userReducer } from "./reducers/UserReducer";

// initial state
const initialState = {
    userData : {
        isConnected: false,
        data: {
          district: '',
          publicAddress: ''
        },
        publicAddress: ''
    },
    registryOffices: []
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
  const [state, dispatch] = useReducer(combineReducers(userReducer), initialState);
  const value = { state, dispatch };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export { GlobalContext, Provider };