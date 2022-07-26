import { useState } from "react";
import { Text, View } from "react-native";
import { Audio } from "expo-av";
import { useContext } from "react";
import { LoaderContext } from "../navigators/RootStack";
import { useDispatch, useSelector } from "react-redux";
import { uploadMedia } from "../api/uploadFile";
import { addRecord } from "../store/actions/formAction";
import { IconButton } from 'react-native-paper';

export default function Record() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [msg, setMsg] = useState("Record here your voice");
  const { setLoadingMessage } = useContext(LoaderContext);
  const access_token = useSelector((state) => state.AuthReducer.authToken);
  const dispatch = useDispatch();
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      } else {
        setMsg("Please grant permission to app to access microphone");
      }
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }
  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({ sound: sound, duration: getDurationFormatted(status.durationMillis), file: recording.getURI(),});
    setRecordings(updatedRecordings);
  }
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }
  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={{marginTop:0}}>
          <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 0, }}>
            <Text>Recording {index + 1} - {recordingLine.duration}</Text>
            <View style={{flexDirection: "row", marginLeft:90}}> 
              <IconButton icon="play-circle" title="Play" size={30} color="orange" onPress={() => recordingLine.sound.replayAsync()} ></IconButton>
              <IconButton icon="content-save" title="Play" size={30} color="orange" onPress={() => onSaveRecord(recordingLine)} ></IconButton>
            </View>
          </View>
        </View>
      );
    });
  }
  async function onSaveRecord(record) {
    console.log("record", record);
    const res = await uploadMedia( record, access_token, setLoadingMessage, "fromRecord" );
    if (res) {
      dispatch(addRecord(res));
      setRecording('ffff');
      // store url
    } else {
      // store path
    }
  }
  return (
    <View style={{height:300, width:'100%'}}>
      <View style={{ flexDirection: "row",justifyContent:'center' }}>
        <View style={{}}>
        <IconButton icon="microphone-plus" title="Save" size={40} color='orange' onPress={recording ? stopRecording : startRecording}/>
        </View>
      </View>
      {getRecordingLines()}
    </View>
  );
}
