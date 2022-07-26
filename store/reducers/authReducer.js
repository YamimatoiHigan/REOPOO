import { GET_COMPANIES, GET_SITES, IS_LOGGEDIN, LOGIN_USER, LOGOUT_USER, } from "../constants/actionsTypes";
  
  const initialState = {
    companies: [],
    sites: [],
    isLoading: false,
    authToken: null,
    companyId: null,
    siteId: null,
    password: null,
    userName: null,
  };
  
  const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COMPANIES:
        return {
          ...state,
          companies: action.payload,
          isLoading: false,
        };
      case GET_SITES:
        return {
          ...state,
          sites: action.payload,
          isLoading: false,
        };
      case LOGIN_USER:
        return {
          ...state,
          companyId: action.payload.companyId,
          siteId: action.payload.siteId,
          userName: action.payload.userName,
          password: action.payload.password,
          authToken: action.payload.authToken,
        };
      case IS_LOGGEDIN:
        return {
          authToken: action.payload,
        };
      case LOGOUT_USER:
        return {
          companies: [],
          sites: [],
          isLoading: false,
          authToken: null,
          companyId: null,
          siteId: null,
          password: null,
          userName: null,
        };
  
      default:
        return state;
    }
  };
  
  export default AuthReducer;