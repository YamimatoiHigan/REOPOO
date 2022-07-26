import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Platform,  } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";
import { uploadMedia } from "../api/uploadFile";
import { useContext } from "react";
import { LoaderContext } from "../navigators/RootStack";
import { pickFileFromMobile, pickPhoto } from "../store/actions/formAction";
import { ButtonText } from "../components/styles";
import { IconButton } from 'react-native-paper';

export default function File() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, startUploading] = useState(false);
  const { setLoadingMessage } = useContext(LoaderContext);

  const dispatch = useDispatch();

  const access_token = useSelector((state) => state.AuthReducer.authToken);

  const YOUR_SERVER_URL = "https://ennysl368sf4new.m.pipedream.net";
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const getMimeType = (ext) => {
    // mime type mapping for few of the sample file types
    switch (ext) {
      case "pdf":
        return "application/pdf";
      case "jpg":
        return "image/jpeg";
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
    }
  };
const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const res = await uploadMedia(result, access_token, setLoadingMessage);
      if (res) {
        dispatch(pickPhoto(res));
        setImage(result.uri);
      } else {
        setImage(result.uri);
      }
    }
  };
  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    console.log(result);

    if (!result.cancelled) {
      setFile(result.uri);
      const res = await uploadMedia(
        result,
        access_token,
        setLoadingMessage,
        "fromPickFile"
      );
      if (res) {
        dispatch(pickFileFromMobile(res));
        setFile(result.uri);
      } else {
        setFile(result.uri);
      }
    }
  };
  const uploadFile = async () => {
    if (file || image) {
      const fileUri = file ? file : image;
      let filename = fileUri.split("/").pop();

      const extArr = /\.(\w+)$/.exec(filename);
      const type = getMimeType(extArr[1]);
      setImage(null);
      setFile(null);
      startUploading(true);

      let formData = new FormData();

      formData.append("filetoupload", { uri: fileUri, name: filename, type });

      const response = await fetch(YOUR_SERVER_URL, {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      startUploading(false);
      const responseAgain = await response.text();
      console.log(responseAgain);
      return response;
    }
  };

  return (
    <View style={{}}>
    <View style={{flexDirection: "row",marginTop:20,width:'30%', }}>
      <View style={{width:'30%', marginRight: 60,}}>
      <IconButton icon="file" title="Save" size={40} color='orange' onPress={pickFile}>
        <ButtonText onPress={pickFile}>Choisir un fichier</ButtonText>
      </IconButton>
      </View>
      <View style={{width:'30%'}}>
      {uploading ? (
        <View style={{paddingTop:20}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <IconButton icon="content-save" title="Save" size={40} color='orange' onPress={uploadFile} >
          <ButtonText onPress={pickFile}>Upload</ButtonText>
        </IconButton>
      )}
      </View>
    </View>
    </View>
  );
}
