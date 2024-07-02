// make basic notification component for this application

import { ListUI } from "@/components/lists/ListItem";
import React from "react";
import { Text, View } from "react-native";

export default function Notification() {
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ListUI
        iconType='notification'
        data={[]}
      />
    </View>
  );
}
