import React,{useContext} from 'react';
import request from '../utils/request';

const Store = React.createContext();

export const useStore = () => useContext(Store);

export const StoreProvider = ({ children, initialState, reducer }) => {
  const [globalState, dispatch] = React.useReducer(reducer, initialState);
  const apiRequest = request(dispatch)

  return (
    <Store.Provider value={[globalState, dispatch, apiRequest]}>{children}</Store.Provider>
  );
};