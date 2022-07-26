import { ADD_FILE, ADD_IMAGE, ADD_LOCATION, ADD_RECORD, ADD_TITLE, ADD_VIDEO, DATE, INIT, PICK_FILE, QRCODE} from "../constants/actionsTypes";
  
  export const pickPhoto = (media) => {
    return async (dispatch) => {
      dispatch({
        type: ADD_FILE,
        payload: media,
      });
    };
  };
  
  export const pickFileFromMobile = (media) => {
    return async (dispatch) => {
      dispatch({
        type: PICK_FILE,
        payload: media,
      });
    };
  };
  
  export const addPhoto = (media) => {
    return async (dispatch) => {
      dispatch({
        type: ADD_IMAGE,
        payload: media,
      });
    };
  };
  export const addVideo = (media) => {
    return async (dispatch) => {
      dispatch({
        type: ADD_VIDEO,
        payload: media,
      });
    };
  };
  export const addRecord = (media) => {
    return async (dispatch) => {
      dispatch({
        type: ADD_RECORD,
        payload: media,
      });
    };
  };
  export const addTitle = (input) => {
    return async (dispatch) => {
      dispatch({
        type: ADD_TITLE,
        payload: input,
      });
    };
  };
  
  export const addQrCode = (input) => {
    return async (dispatch) => {
      dispatch({
        type: QRCODE,
        payload: input,
      });
    };
  };
  
  export const addLocation = (location) => {
    return async (dispatch) => {
      dispatch({
        type: ADD_LOCATION,
        payload: location,
      });
    };
  };
  
  export const addDate = (date) => {
    return async (dispatch) => {
      dispatch({
        type: DATE,
        payload: date,
      });
    };
  };
  
  export const inititialization = (data) => {
    return async (dispatch) => {
      dispatch({
        type: INIT,
        payload: data,
      });
    };
  };
  