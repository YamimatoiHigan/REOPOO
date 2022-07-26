import React, { FC } from "react";
import { Modal, Text, View } from "react-native";

export const Loader = ({ text }) => {
  return (
    <Modal visible={!!text} transparent={true}>
      <View style={{flex: 1,justifyContent: "center",alignItems: "center",backgroundColor: "rgba(191, 191, 191, 0.7)",}}>
        <View style={{ borderRadius: 5, overflow: "hidden", }} >
          <Text style={{ backgroundColor: "white", padding: 25 }}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

