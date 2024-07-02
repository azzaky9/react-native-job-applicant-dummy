import { useAuth } from "@/context/Auth";
import { Button, Datepicker, Input, Layout } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { Text, View, ToastAndroid } from "react-native";
import { StyleSheet } from "react-native";
import { db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

type Profile = {
  fullname: string;
  age: number;
  lamaBekerja: number;
  jenisKelamin: string;
  jenjangPendidikan: string;
};

export default function Profile() {
  const auth = useAuth();

  const [isEditMode, setIsEditMode] = React.useState(false);

  const [data, setData] = useState<Profile>({
    age: 0,
    jenisKelamin: "",
    jenjangPendidikan: "",
    lamaBekerja: 0,
    fullname: ""
  });

  const updateData = (key: keyof Profile, value: any) => {
    setData({
      ...data,
      [key]: value
    });
  };

  const onSubmit = async () => {
    try {
      if (auth.user) {
        await setDoc(doc(db, "profile", auth.user.id), data);
        ToastAndroid.show("Profile updated.", ToastAndroid.SHORT);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        console.log(e.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.user) {
          const docRef = doc(db, "profile", auth.user.id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setData({
              age: data.age,
              jenisKelamin: data.jenisKelamin,
              jenjangPendidikan: data.jenjangPendidikan,
              lamaBekerja: data.lamaBekerja,
              fullname: data.fullname
            });
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(e);
          console.log(e.message);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View style={{ flex: 1, paddingLeft: 18, paddingRight: 18 }}>
        <Text
          style={{
            marginTop: 6,
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
            placeholder='Full Name'
            disabled={!isEditMode}
            value={data.fullname}
            onChangeText={(value) => {
              updateData("fullname", value);
            }}
            // value={value}
            // onChangeText={(nextValue) => setValue(nextValue)}
          />

          <Input
            placeholder='Lama Bekerja'
            disabled={!isEditMode}
            value={String(data.lamaBekerja)}
            onChangeText={(value) => {
              updateData("lamaBekerja", value);
            }}
            // value={value}
            // onChangeText={(nextValue) => setValue(nextValue)}
          />
          <Input
            placeholder='Jenis Kelamin'
            disabled={!isEditMode}
            value={data.jenisKelamin}
            onChangeText={(value) => {
              updateData("jenisKelamin", value);
            }}
            // value={value}
            // onChangeText={(nextValue) => setValue(nextValue)}
          />
          <Input
            placeholder='Jenjang Pendidikan'
            disabled={!isEditMode}
            value={data.jenjangPendidikan}
            onChangeText={(value) => {
              updateData("jenjangPendidikan", value);
            }}
            // value={value}
            // onChangeText={(nextValue) => setValue(nextValue)}
          />
          <Input
            placeholder='Age'
            disabled={!isEditMode}
            value={String(data.age)}
            onChangeText={(value) => {
              updateData("age", value);
            }}
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
                onPress={() => onSubmit()}
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
