import { ADD_FILE, ADD_IMAGE, ADD_LOCATION, ADD_RECORD, ADD_TITLE, ADD_VIDEO, DATE, INIT, PICK_FILE, QRCODE, } from "../constants/actionsTypes";
  
  const formState = {
    designation: null,
    date: null,
    equipmentCode: null,
    geolocation: null,
    requestFiles: {
      photo: [],
      video: [],
      record: [],
      pickPhoto: [],
      pickFile: [],
    },
  };
  const formReducer = (state = formState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_FILE:
        if (state.requestFiles.pickPhoto?.indexOf(payload) == -1) {
          return {
            ...state,
            requestFiles: {
              ...state.requestFiles,
              pickPhoto: [...state.requestFiles.pickPhoto, payload],
            },
          };
        } else return state;
      case PICK_FILE:
        if (state.requestFiles.pickFile?.indexOf(payload) == -1) {
          return {
            ...state,
            requestFiles: {
              ...state.requestFiles,
              pickFile: [...state.requestFiles.pickFile, payload],
            },
          };
        } else return state;
      case ADD_IMAGE:
        if (state.requestFiles.photo?.indexOf(payload) == -1) {
          return {
            ...state,
            requestFiles: {
              ...state.requestFiles,
              photo: [...state.requestFiles.photo, payload],
            },
          };
        } else return state;
      case ADD_VIDEO:
        if (state.requestFiles.video?.indexOf(payload) == -1) {
          return {
            ...state,
            requestFiles: {
              ...state.requestFiles,
              video: [...state.requestFiles.video, payload],
            },
          };
        } else return state;
      case ADD_RECORD:
        if (state.requestFiles.record?.indexOf(payload) == -1) {
          return {
            ...state,
            requestFiles: {
              ...state.requestFiles,
              record: [...state.requestFiles.record, payload],
            },
          };
        } else return state;
      case ADD_LOCATION:
        return {
          ...state,
          geolocation: payload,
        };
  
      case ADD_TITLE:
        return {
          ...state,
          designation: payload,
        };
      case DATE:
        return {
          ...state,
          date: payload,
        };
      case QRCODE:
        return {
          ...state,
          equipmentCode: payload,
        };
      case INIT:
        return {
          ...state,
          ...payload,
        };
      default:
        return state;
    }
  };
  export default formReducer;
  