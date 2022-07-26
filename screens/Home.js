import { useEffect, useState } from "react";
import GetCurrentDate from "../components/inputs/getCurrentDate";
import GetLocation from "../components/inputs/getLocation";
import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
//import icons
import { Ionicons } from "@expo/vector-icons";
//import the formik lib
import { Formik } from "formik";
import { StyledContainerHome, InnerContainer, FormArea, LeftIcon, RightIcon, ButtonHome, ButtonText, StyledInputLabel, StyledTextInput, Colors,} from "../components/styles";
import { View, Text, Alert, ScrollView} from "react-native";
import { IconButton} from 'react-native-paper';
import axios from "axios";
import { useSelector } from "react-redux";
import File from "./File";
//colors
const { darklight, orange } = Colors;

const Home = ({ navigation }) => {
  const route = useRoute();
  const { text } = route?.params || {};
  const [data, setData] = useState({});
  const [date, setDate] = useState("");
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");
  const token = useSelector((state) => state.AuthReducer.authToken);
  const formstates = useSelector((state) => state.formReducer);
  console.log(formstates);
 
  const _config = {headers: {Authorization: `Bearer ${token}`,},};

  const saveData = async () => {
    const url =
      "https://timserver.northeurope.cloudapp.azure.com/GmaoProWebApi/api/IR";
      const payload = {
        ...data,
        requestFiles: [formstates],
        equipmentCode: text,
        geolocation: location.toString(),
        designation: title,
      };
    if (date) payload.date = date;
    try {
      const res = await axios.post(url, payload, _config);
      if (res.data) {
        Alert.alert("", "La panne est déclarée avec succés !");
        console.log("msg", formstates);
        setTitle("");
        setLocation("");
        setDate("");
        //setQrCode("");
      }
    } catch (error) {
      Alert.alert("Error", "Error:" + error);
    }
    //,,title,
  };

  useEffect(() => {
    const init = async () => {
      const url =
        "https://timserver.northeurope.cloudapp.azure.com/GmaoProWebApi/api/IR/init";
      const data = await axios.get(url, _config);
      if (data.data) {
        setData(data.data);
      }
    };
    try {
      init();
    } catch (error) {
      console.warn(error);
    }
  }, []);

  return (
    <StyledContainerHome>
      <StatusBar style="dark" />
      <ScrollView>
      <InnerContainer>
        <Text style={{fontSize:28}}>Déclarer la panne</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            navigation.navigate("Home");
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <FormArea>
              <MyTextInput
                icon="information"
                placeholder="Entrer le nom de la panne"
                placeholderTextColor={darklight}
                onChangeText={(title) => {
                  setTitle(title);
                  handleChange(title);
                }}
                value={title}
              />
              
              <GetCurrentDate date={date} setDate={setDate} />
              <GetLocation location={location} setLocation={setLocation} />
              <View style={{flexDirection: "row", marginBottom: 20 }}>
                <View style={{ width: "68%", height: 50, marginRight: 20 }}>
                  <MyTextInput icon="qr-code" placeholder="QR de l'équipement">{text}</MyTextInput>
                </View>
                <View style={{ width: "25%", height: 60, marginTop:18}}>
                <ButtonHome onPress={() => navigation.navigate("QrCode")}>
                  <ButtonText style={{ color: "#fff" }}>Scan</ButtonText>
                </ButtonHome>
                </View>
              </View>
             
             <View style={{backgroundColor:'#EEEEEE', height:50, marginTop:20}}>
             <Text style={{ color:'#1f2937', fontSize:18, textAlign:'center', paddingTop:12 }}> Ajouter Media </Text>
             </View>
            
              <View style={{flexDirection:'row', }}>
             <View style={{marginTop:20,width:'15%'}}>
              <View style={{}}>
                <View style={{marginLeft:-20}}>
                <IconButton icon="camera" size={40} title={"Scan again ?"} color='orange'  onPress={() => navigation.navigate("GetPhoto")}>
                    <ButtonText style={{ color: "#fff" }}>Photo</ButtonText>
                  </IconButton>
                </View>
              </View>
            </View>
            
            <View style={{marginTop:20,width:'30%', marginRight:45}}>
              <View style={{}}>
                <View style={{}}>
                <IconButton icon="video" size={40} title={"Scan again ?"} color="orange" onPress={() => navigation.navigate("GetVideo")}>
                    <ButtonText style={{ color: "#fff" }}>Video</ButtonText>
                  </IconButton>
                </View>
                
              </View>
              
            </View>
            <View>
            
            <File />
            </View>
            </View>
            <View style={{justifyContent:'center', marginLeft:110, marginTop:-70}}>
            <IconButton icon="microphone" title="Save" size={40} color='orange' onPress={() => navigation.navigate("AddRecord")}/>
            </View>
            <View style={{marginTop:30}}> 
            <ButtonHome onPress={saveData}>
              <ButtonText>Déclarer la panne</ButtonText>
            </ButtonHome>
            </View>
    
            </FormArea>
          )}
        </Formik>
      </InnerContainer>
      </ScrollView>
    </StyledContainerHome>

  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Ionicons name={icon} size={25} color={orange} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
    </View>
  );
};

export default Home;
