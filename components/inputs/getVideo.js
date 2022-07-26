import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { useEffect, useState, useRef } from "react";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { uploadVideo } from "../../api/uploadFile";
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { LoaderContext } from "../../navigators/RootStack";
import { addVideo } from "../../store/actions/formAction";

export default function GetVideo() {
  let cameraRef = useRef();
  const { setLoadingMessage } = useContext(LoaderContext);
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.AuthReducer.authToken);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Requestion permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted.</Text>;
  }

  let recordVideo = () => {
    setIsRecording(true);
    let options = {quality: "1080p", maxDuration: 60, mute: false,
    };

    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  let stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  if (video) {
    let shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    let saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(async () => {
        const res = await uploadVideo(video, access_token, setLoadingMessage);

        if (res) {
          // remove photo after success otherwise user can retry saving it
          // get response then dispatch action
          dispatch(addVideo(res));
          setVideo(undefined);
        } else {
        }
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Video style={styles.video} source={{ uri: video.uri }} useNativeControls resizeMode="contain" isLooping />
        <View style={{ height:200}}>
          
       
        <View style={{flexDirection:'row',marginTop:70}}>

        <IconButton title="Discard" icon="camera-retake" size={50}  onPress={() => setVideo(undefined)} />
        {hasMediaLibraryPermission ? (
          <IconButton icon="content-save" title="Save" size={50} onPress={saveVideo} />
        ) : undefined}
        </View>
      
      </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ height: 400, width: "100%", marginTop: 150 }}>
      <Camera style={styles.container} ref={cameraRef}></Camera>
      <View style={styles.buttonContainer}>
        <IconButton icon="record-rec" title="Take Pic" size={50} onPress={isRecording ? stopRecording : recordVideo} />
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
  video: {
    alignSelf: "stretch",
    flex: 1,
  },
});
