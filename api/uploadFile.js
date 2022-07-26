import axios from "axios";
import { Alert } from "react-native";
import baseUrl  from '../constants'
// upload media
export const uploadMedia = async (photo, token, cb, from) => {
  const Url = `${baseUrl}/api/UploaderFile/Upload` ;
  let body = new FormData();
  const photoName = photo?.uri?.split("/")?.pop();
  const photoExtension = photoName?.split(".")?.pop();

  console.log(photo?.uri);

  if (from === "fromPickFile") {
    body.append("file", {
      uri: photo.uri,
      name: photoName,
      type: `application/*`,
    });
  }
  if (from === "fromPhoto") {
    body.append("file", {
      uri: photo.uri,
      name: photoName,
      type: `image/*`,
    });
  }

  if (from === "fromRecord") {
    const fileName = photo?.file?.split("/")?.pop();
    console.log("fileName", fileName);

    body.append("file", {
      uri: photo.file,
      name: fileName,
      type: "audio/*",
    });
  }

  cb("Loading ...");
  fetch(Url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
    body,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("response" + JSON.stringify(res));

      cb(undefined);

      return JSON.stringify(res);
    })
    .catch((e) => {
      cb(undefined);
      Alert.alert("Error", e?.message || "error");
    })
    .finally(() => {});
};

export const uploadVideo = async (video, token, cb) => {
  const Url =
    "https://timserver.northeurope.cloudapp.azure.com/GmaoProWebApi/api/UploaderFile/Upload";
  let body = new FormData();
  const videoName = video?.uri?.split("/")?.pop();
  const videoExtension = videoName?.split(".")?.pop();

  body.append("video", {
    uri: video?.uri,
    name: videoName,
    type: video?.mimeType,
  });

  cb("Loading ...");
  fetch(Url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
      type: `application/${videoExtension}`,
    },
    body,
  })
    .then((res) => res.json())
    .then((res) => {
      Alert.alert("", res);
      cb(undefined);
      return JSON.stringify(res);
    })
    .catch((e) => {
      cb(undefined);
      Alert.alert("Error", typeof e === "string" ? e : e?.message ?? "error");
    })
    .finally(() => {});
};
