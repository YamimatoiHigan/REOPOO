import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from 'react-native-paper';

const QrCode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const [qrCode, setQrCode] = useState('');

  const navigation = useNavigation();

  const save = () => {
    setText('')
    navigation.navigate('Home' , {text : text});
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={"Allow Camera"} onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  return (
    <View >
      <View style={{}}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{height: 400, width: '100%', marginTop: 70, }} />
      </View>
      <View style={{marginTop:40, alignItems:'center'}}>
        <Text
          value={text}
          onChangeText={(txt)=>setQrCode(txt)}
          style={{textAlign:'center', fontSize:20}}>{text}</Text>
        {scanned && (
          <View style={{flexDirection:'row'}}>
            <View style={{ width: 180, height:60, marginTop:20, alignItems:'center', justifyContent:'center' }}>
              <IconButton icon="qrcode-scan" size={50} title={"Scan again ?"} onPress={() => setScanned(false)}  /> 
            </View>
            <View style={{marginTop:5}}>
              <IconButton icon="content-save-move" size={55} title='Save the code' onPress={save}></IconButton>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
});

export default QrCode;


