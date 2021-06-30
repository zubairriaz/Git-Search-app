import {SET_ITEM, SET_ISLOADING, SET_ERROR_MESSAGE} from '../utils/constants'

export const setItems = (item) => ({
    type: SET_ITEM,
    item,
  });

  export const setErrorMessgae = (message) => ({
    type: SET_ERROR_MESSAGE,
    message,
  });

  export const setIsLoading = (bool) => ({
    type: SET_ISLOADING,
    bool,
  });
  
  