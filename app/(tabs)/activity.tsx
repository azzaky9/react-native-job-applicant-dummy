// make basic activity component for this application

import React from "react";
import { Text, View } from "react-native";

export default function Activity() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ marginTop: 50 }}>Activity</Text>
    </View>
  );
}
