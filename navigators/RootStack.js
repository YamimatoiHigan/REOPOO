import { createContext, useState, useEffect } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import { IconButton } from "react-native-paper";
import { BASE_URL } from "../constants/index";
//react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//screens
import Login from "../screens/Login";
import Home from "../screens/Home";
import QrCode from "../screens/QrCode";
import GetPhoto from "../components/inputs/getPhoto";
import GetVideo from "../components/inputs/getVideo";
import Record from "../screens/Record";
import File from "../screens/File";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import { init, logout } from "../store/actions/authActions";
import { Loader } from "../components/Loader";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const RootStack = () => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} title="Logout"
        options={{
          headerRight: () => (
            <View style={{ marginRight: 20 }}>
              <IconButton
                size={30}
                icon="logout"
                onPress={() =>
                  Alert.alert("Se déconnecter ?", "", [
                    {
                      text: "Annuler",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        console.log("OK Pressed");
                        dispatch(logout());
                      },
                    },
                  ])
                }
              />
            </View>
          ),
        }}
      />
     
      <Stack.Screen name="QrCode" component={QrCode} />

      <Stack.Screen
        name="GetPhoto"
        component={GetPhoto}
        options={{
          headerRight: () => (
            <View style={{ marginRight: 20, marginTop: 5 }}>
            
            </View>
          ),
        }}
      />
      <Stack.Screen name="GetVideo" component={GetVideo} />

      <Stack.Screen
        name="File"
        component={File}
        options={{
          headerRight: () => (
            <View style={{ marginRight: 20, marginTop: 5 }}>
              <IconButton size={30} icon="content-save-move" onPress={() => alert("Se déconnecter ?")} title="Logout" />
            </View>
          ),
        }}
      />

      <Stack.Screen name="AddRecord" component={Record} />
     
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const token = useSelector((state) => state.AuthReducer.authToken);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const initUser = async () => {
    await dispatch(init());
    setLoading(false);
  };
  useEffect(() => {
    initUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={"gray"} />
      </View>
    );
  }
  //if(isLoaging) return null
  return (
    <NavigationContainer>
      {token ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
export const LoaderContext = createContext({
  loadingMessage: undefined,
  setLoadingMessage: () => {},
});
const App = () => {
  const [loadingMessage, setLoadingMessage] = useState(undefined);

  return (
    <Provider store={store}>
      <LoaderContext.Provider value={{ loadingMessage, setLoadingMessage }}>
        <RootNavigation />
        <Loader text={loadingMessage} />
      </LoaderContext.Provider>
    </Provider>
  );
};

export default App;
