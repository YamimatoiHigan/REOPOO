import { useState } from "react";
import { View } from "react-native";
import { ButtonHome, ButtonText, LeftIconDate, StyledTextInput, Colors } from "../../components/styles";
import { Ionicons } from "@expo/vector-icons";
const { orange } = Colors;

const GetCurrentDate = ({ date, setDate }) => {
  const [innerDate, setInnerDate] = useState("");
  const showDate = () => {
    //Get Current Date
    let date = new Date().getDate();
    //Get Current Month
    let month = new Date().getMonth() + 1;
    //Get Current Year
    let year = new Date().getFullYear();
    //Get Current Time Hours
    let hours = new Date().getHours();
    //Get Current Time Minutes
    let min = new Date().getMinutes();
    //Get Current Time Seconds
    let sec = new Date().getSeconds();
    let finalObject =
      date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec;
    setDate(new Date());
    setInnerDate(finalObject);
  };
  return (
    <View style={{flexDirection: "row", marginBottom: 20 }}>
      <View style={{ width: "68%", height: 50, marginRight: 20 }}>
        <MyTextInput label="Nom de la panne" icon="today-outline" placeholder="Date">{innerDate}</MyTextInput>
      </View>
      <View style={{ width: "25%", height: 60, }}>
        <ButtonHome onPress={showDate}>
          <ButtonText style={{ color: "#fff" }}>Date</ButtonText>
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


export default GetCurrentDate;
