import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./reducers/authReducer";
import formReducer from "./reducers/formReducer";

const RootReducers = combineReducers({
  //Reducers
  AuthReducer: AuthReducer,
  formReducer: formReducer,
});

export const store = createStore(RootReducers, applyMiddleware(thunk));