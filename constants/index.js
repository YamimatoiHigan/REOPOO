import { Platform } from "react-native";

let baseUrl ='';

{Platform.OS == 'android'?
    baseUrl='https://timserver.northeurope.cloudapp.azure.com/GmaoProWebApi'
    : baseUrl = 'https://timserver.northeurope.cloudapp.azure.com/GmaoProWebApi'
}

export default baseUrl;