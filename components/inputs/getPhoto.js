import {StyleSheet, Text, View, SafeAreaView, Image} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { IconButton, Colors } from "react-native-paper";
import { uploadMedia } from "../../api/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { LoaderContext } from "../../navigators/RootStack";
import { addPhoto } from "../../store/actions/formAction";
const { orange } = Colors;


export default function GetPhoto() {
  const { setLoadingMessage } = useContext(LoaderContext);
  const access_token = useSelector((state) => state.AuthReducer.authToken);
  const dispatch = useDispatch();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>Permission for camera not granted. Please change this in settings.</Text>
    );
  }

  let takePic = async () => {
    let options = {quality: 1, base64: true, exif: false};
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {shareAsync(photo.uri).then(() => {setPhoto(undefined);});};

     let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(async () => {
        const res = await uploadMedia( photo, access_token, setLoadingMessage, "fromPhoto" );
        if (res) {
          // remove photo after success otherwise user can retry saving it
          dispatch(addPhoto(res));
          setPhoto(undefined);
        }
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }}/>
        <View style={{ height:200}}>
          <View style={{flexDirection:'row',marginTop:70}}>
          <IconButton title="Discard" icon="camera-retake" size={50} onPress={() => setPhoto(undefined)} />
            {hasMediaLibraryPermission ? (
              <IconButton icon="content-save" title="Save" size={50} onPress={savePhoto} />
              ) : undefined}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ height: 400, width: "100%", marginTop: 150 }}>
      <Camera style={styles.container} ref={cameraRef}>
      </Camera>
      <View style={styles.buttonContainer}>
        <IconButton icon="camera" title="Take Pic" size={50} color={orange} onPress={takePic} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});

