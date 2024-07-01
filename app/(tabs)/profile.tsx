import { useAuth } from "@/context/Auth";
import { Button, Datepicker, Input, Layout } from "@ui-kitten/components";
import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    marginTop: 10,
    gap: 10
  },
  text: {
    marginHorizontal: 8
  }
});

export default function Profile() {
  const auth = useAuth();

  const [isEditMode, setIsEditMode] = React.useState(false);

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View style={{ flex: 1, paddingLeft: 18, paddingRight: 18 }}>
        <Text
          style={{
            marginTop: 50,
            fontSize: 25,
            fontWeight: 600,
            textTransform: "capitalize"
          }}
        >
          Hello {auth.user?.displayName}
        </Text>
        <Layout
          level='1'
          style={{
            backgroundColor: "#ffffff",
            paddingLeft: 16,
            paddingRight: 16,
            marginTop: 17,
            marginBottom: 15,
            borderRadius: 4,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            paddingTop: 10,
            paddingBottom: 10,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 1,
            gap: 10
          }}
        >
          <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
            Edit Profile
          </Text>
          <Input
            placeholder='Username'
            disabled={!isEditMode}
            // value={value}
            // onChangeText={(nextValue) => setValue(nextValue)}
          />
          <Input
            placeholder='Age'
            disabled={!isEditMode}
            // value={value}
            // onChangeText={(nextValue) => setValue(nextValue)}
          />
          <Input
            placeholder='Lama Bekerja'
            disabled={!isEditMode}
            // value={value}
            // onChangeText={(nextValue) => setValue(nextValue)}
          />
          <Input
            placeholder='Jenis Kelamin'
            disabled={!isEditMode}
            // value={value}
            // onChangeText={(nextValue) => setValue(nextValue)}
          />
          <Input
            placeholder='Jenjang Pendidikan'
            disabled={!isEditMode}
            // value={value}
            // onChangeText={(nextValue) => setValue(nextValue)}
          />
          <Input
            placeholder='Umur'
            disabled={!isEditMode}
            // value={value}
            // onChangeText={(nextValue) => setValue(nextValue)}
          />
        </Layout>
        <Layout
          style={styles.container}
          level='1'
        >
          {isEditMode && (
            <>
              <Button
                size='medium'
                status='danger'
                appearance='outline'
                onPress={() => setIsEditMode(false)}
              >
                CANCEL
              </Button>
              <Button
                size='medium'
                onPress={() => console.log("caksas")}
              >
                SAVE
              </Button>
            </>
          )}
          {!isEditMode && (
            <Button
              size='medium'
              onPress={() => setIsEditMode(true)}
            >
              EDIT
            </Button>
          )}
        </Layout>
      </View>
    </View>
  );
}
