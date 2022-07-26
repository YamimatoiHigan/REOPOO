import { useState, useEffect } from "react";
import axios from "axios";
import qs from "qs";

import * as React from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/authActions";

import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
// You can import from local files
import DropDownPicker from "react-native-dropdown-picker";
//import icons
import { Octicons, Ionicons } from "@expo/vector-icons";
//import the formik lib
import { Formik } from "formik";
import * as yup from "yup";

import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, FormArea, LeftIcon, RightIcon, StyledButton, ButtonText, StyledInputLabel, StyledTextInput, Colors } from "../components/styles";

import {View, StyleSheet, Text, ActivityIndicator,} from "react-native";
//colors
const { brand, darklight, orange } = Colors;
//API
import baseUrl from "../common";

const loginValidationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
  companyId: yup.string().required("company is required"),
  siteId: yup.string().required("site is required"),
});

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);

  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [response, setResponse] = useState();
  let [isLoadingT, setIsLoadingT] = useState(true);
  let [errorT, setErrorT] = useState();
  let [responseT, setResponseT] = useState();
  const [open, setOpen] = useState(false);
  const [openT, setOpenT] = useState(false);
  const [value, setValue] = useState(null); //company
  const [valueT, setValueT] = useState(null); //sites
  const [itemsT, setItemsT] = useState([
    { label: "SAV", value: "SAV" },
    { label: "SERVICES", value: "SERVICES" },
    { label: "TIM", value: "TIM" },
  ]);
  const [sitesData, setSitesData] = useState([
    { label: "Tunis", value: "Tunis" },
    { label: "Sousse", value: "Sousse" },
    { label: "Sfax", value: "Sfax" },
  ]);
  const [siteId, setSiteId] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [msg, setMsg] = useState();
  const [msgType, setMsgType] = useState();

  useEffect(() => {
    fetch(
      "https://timserver.northeurope.cloudapp.azure.com/GmaoProWebApi/api/authorize/companies"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setResponse(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
    fetch(
      "https://timserver.northeurope.cloudapp.azure.com/GmaoProWebApi/api/authorize/sites"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoadingT(false);
          setResponseT(result);
        },
        (error) => {
          setIsLoadingT(false);
          setErrorT(error);
        }
      );
  }, []);

  let companies =
    response &&
    response?.map((res) => ({
      label: res.name,
      value: res.id,
      testID: res.id,
    }));
  let companyID =
    response && response?.map((res) => ({ label: res.id, value: res.id }));
  let sites =
    responseT && responseT?.map((res) => ({ label: res.name, value: res.id }));
  let sitesId =
    responseT && responseT?.map((res) => ({ label: res.id, value: res.id }));

  const handleSubmit = async () => {
    console.log(
      "username, password, valueT : sites, value: company",
      username,
      password,
      valueT,
      value
    );
    dispatch(login({ username, password, valueT, value }));
  };

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text>{error}</Text>;
    }

    console.log(companies);
    console.log(sites);
    return (
      <View>
        {response &&
          response.map((res) => <Text key={res.id}>{res.name}</Text>)}
      </View>
    );
  };

  useEffect(() => {
    setValue(null);
    fetch(
      `https://timserver.northeurope.cloudapp.azure.com/GmaoProWebApi/api/authorize/${valueT}/SitesByCompany`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoadingT(false);
          if (result) {
            let arr = [];
            console.log("result", result);
            result.map((item) => {
              arr.push({ label: item.name, value: item.id });
            });
            console.log(result.length);
            setSitesData(arr);
          }
        },
        (error) => {
          console.log("error", error);
          setIsLoadingT(false);
          setErrorT(error);
        }
      );
  }, [valueT]);

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo
          resizeMode="cover"
          source={require("./../assets/imgs/LogoApp.png")}
        />
        <PageTitle>GMAOPRO</PageTitle>
        <SubTitle>Account Login</SubTitle>
        <Formik initialValues={{ username: "", password: "", company: "", site: "", }} onSubmit={async () => {await handleSubmit(); }}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <FormArea>
              <View style={{ marginBottom: 15, zIndex: 4,  }}>
                <DropDownPicker
                  placeholder="Select a company"
                  open={openT}
                  value={valueT}
                  items={companies ? companies : itemsT}
                  setOpen={setOpenT}
                  setValue={setValueT}
                  setItems={setItemsT}
                  setSiteId={companyID}
                />
              </View>

              <View style={{ marginBottom: 15, zIndex: 3 }}>
                <DropDownPicker
                  placeholder="Select a site"
                  open={open}
                  value={value}
                  items={sitesData}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setSitesData}
                  setSiteId={sitesId}
                />
              </View>

              <MyTextInput
                name="username"
                label="Username"
                icon="person"
                placeholder="Enter the username"
                placeholderTextColor={darklight}
                onChangeText={(text) => setUsername(text)}
                onBlur={handleBlur("username")}
                value={username}
              />
              <MyTextInput
                label="Password"
                icon="lock"
                placeholder=" * * * * * * * *"
                placeholderTextColor={darklight}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
                onChangeText={(text) => setPassword(text)}
                onBlur={handleBlur("password")}
                value={password}
              />

              <StyledButton onPress={handleSubmit}>
                <ButtonText>Login</ButtonText>
              </StyledButton>

              {showSpinner && <ActivityIndicator color={"red"} />}

            </FormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
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
        <Octicons name={icon} size={30} color={orange} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"} size={30} color={darklight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;



