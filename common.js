import { Platform } from "react-native";

let baseUrl ='';

{Platform.OS == 'android'?
    baseUrl='http://10.0.2.2:3000/sent-a-car/'
    : baseUrl = 'http://localhost:3000/sent-a-car/'
}

export default baseUrl;