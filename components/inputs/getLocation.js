import { useState } from "react";
import { View } from "react-native";
import { ButtonHome, ButtonText, LeftIconDate, StyledTextInput, Colors } from "../../components/styles";
const { orange } = Colors;
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

const GetLocation = ({ location, setLocation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [coord, setCoord] = useState()
  async function GetCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
    setCoord(location);
    setLocation(location.coords);
    console.log(location)
  }
  return (
    <View style={{ flexDirection: "row", }}>
       <View style={{ width: "68%", height: 50, marginRight: 20 }}>
        <MyTextInput label="Nom de la panne" icon="location" placeholder="Location" >{JSON.stringify(coord)}</MyTextInput>
      </View>
      <View style={{ width: "25%", height: 60, }}>
        <ButtonHome title="Location" onPress={GetCurrentLocation}>
          <ButtonText style={{ color: "#fff" }}>Map</ButtonText>
        </ButtonHome>
      </View>
    </View>
  );
};


const MyTextInput = ({label, icon, ...props}) => {
  return (
    <View>
      <LeftIconDate>
        <Ionicons name={icon} size={25} color={orange} />
      </LeftIconDate>
      <StyledTextInput {...props} />
    </View>
  );
};

export default GetLocation;
