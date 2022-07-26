import {LOGIN_USER, IS_LOGGEDIN, LOGOUT_USER,} from "../constants/actionsTypes";
import axios from "axios";
import qs from "qs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import baseUrl  from '../../constants'
  export const init = () => {
    return async (dispatch) => {
      let token = await AsyncStorage.getItem("authToken");
      if (token !== null) {
        dispatch({
          type: IS_LOGGEDIN,
          payload: token,
        });
      }
    };
  };
  
  export const login = (data) => {
    if (!data.username || !data.password || !data.value || !data.valueT) {
      Alert.alert("Error", "Please Fill all the required info");
      return;
    }
    return async (dispatch) => {
      axios
        .post(
          `${baseUrl}/token`,
          qs.stringify({
            grant_type: "password",
            username: data.username,
            password: data.password,
            companyId: data.valueT,
            siteId: data.value,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          console.log("res.data.access_token", res.data.access_token);
          dispatch({
            type: LOGIN_USER,
            payload: {
              password: data.password,
              siteId: data.siteId,
              userName: data.username,
              companyId: data.valueT,
              authToken: res.data.access_token,
            },
          });
          AsyncStorage.setItem("authToken", res.data.access_token);
        })
        .catch((err) => {
          Alert.alert("Vérifier les informations !")
          //Alert.alert("Error", JSON.stringify(err));
          //console.log("api Erorr: ", err);
        });
    };
  };
  
  export const logout = () => {
    return async (dispatch) => {
      await AsyncStorage.clear();
      dispatch({
        type: LOGOUT_USER,
        payload: null,
      });
    };
  };