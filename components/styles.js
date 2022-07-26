import styled from "styled-components/native";
import Canstants from "expo-constants";

const StatusBarHeight = Canstants.statusBarHeight

export const Colors = {
  primary: "#ffffff",
  secondary: "#e5e7eb",
  tertiary: "#1f2937",
  darklight: "#9ca3af",
  brand: "#6d28d9",
  green: "#108981",
  red: "#ef4444",
  orange:'#FF8000'
};

const { primary, secondary, tertiary, darklight, brand, green, red, orange } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding:25px;
    padding-top:${StatusBarHeight+10}px;
    padding-top:150px;
    background-color: ${primary};
`
export const StyledContainerHome = styled.View`
    flex: 1;
    padding:25px;
    padding-top:${StatusBarHeight+10}px;
    background-color: ${primary};
`
export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`
export const PageLogo = styled.Image`
    width: 50px;
    height: 50px;
`
export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${orange};
    padding: 10px;
`

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 14px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`

export const FormArea = styled.View`
    width: 90%;
`
export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`
export const LeftIconDate = styled.View`
    left: 15px;
    top: 20px;
    position: absolute;
    z-index: 1;
`

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`
export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${orange};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 60px;

    ${(props)=>props.sign == true && `
        background-color:${green}
    `}
`
export const ButtonHome = styled.TouchableOpacity`
    padding: 15px;
    background-color: orange;
    color: orange;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 4px;
    margin-bottom: 15px;
    height: 60px;
    border:solid orange 1px;

    ${(props)=>props.sign == true && `
        background-color:${green}
    `}
`

export const ButtonText = styled.Text`
    color:${primary};
    font-size: 18px;
`
export const StyledInputLabel = styled.Text`
    color:${tertiary};
    font-size: 13px;
    text-align: left;
`
export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left:50px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-top:3px ;
    margin-bottom: 10px;
    color:${tertiary};
`
export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color:${props=>props.type == 'Succès'?green : red}
`
export const Line = styled.View`
    height: 1px;
    width: 90%;
    background-color: ${darklight};
    margin-top: 10px;
    margin-bottom: 10px;
    align-self: center;
`
export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`
export const TextLinkContent = styled.Text`
    color:${orange};
    font-size: 15px;
    padding-left: 8px;
`
export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`
export const ExtreText = styled.Text`
    justify-content: center;
    align-content: center;
    color:${tertiary};
    font-size:15px;
`
