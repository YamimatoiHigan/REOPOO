import { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";

const NavigateToDetails = props => {
  props.navigation.navigate('QrCode')
}
const GetQrCode = (props) => {
  const [date, setDateTime] = useState("");
  
  return (
    <View style={{ flexDirection: "row", marginTop: 20 }}>
      <View style={{ width: 180, height: 50, marginRight: 20 }}>
        <TextInput style={styleSheet.input}>{date}</TextInput>
      </View>
      <View style={{ width: 100, height: 60, paddingTop: 1 }}>
        <Button title="Qr CODE" onPress={()=>NavigateToDetails(props)}></Button>
      </View>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  HomeContainer: {
    display: "flex",
    border: "solid red 1px",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default GetQrCode;
