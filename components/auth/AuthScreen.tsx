import { useAuth } from "@/context/Auth";
import { router } from "expo-router";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Button, TextInput } from "react-native";

type Props = {
  title: string;
  subTitle?: string;
  navigationLabel: string;
  navigationAction: () => void;
  onSubmit: (data: { email: string; password: string }) => void;
  children?: React.ReactNode;
};

export default function AuthScreen({
  title,
  subTitle,
  children,
  navigationLabel,
  navigationAction,
  onSubmit
}: Props) {
  const auth = useAuth();
  const user = auth.user;

  const path = usePathname();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      return router.navigate("/home");
    }
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          padding: 20
        }}
      >
        <Text style={{ fontWeight: 600, fontSize: 25 }}>{title}</Text>
        <Text style={{ marginBottom: 20, fontSize: 15, color: "gray" }}>
          {subTitle}
        </Text>
        <TextInput
          style={{
            height: 60,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            padding: 9
          }}
          placeholder='Email'
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />

        <TextInput
          style={{
            height: 60,
            padding: 9,
            marginBottom: 10,
            borderColor: "gray",
            borderWidth: 1
          }}
          value={password}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        {children}
        <Button
          title={title}
          onPress={() => onSubmit({ email, password })}
        />
      </View>
      <View>
        <Text
          onPress={navigationAction}
          style={{
            alignSelf: "flex-start",
            textDecorationLine: "underline",
            color: "gray"
          }}
        >
          {navigationLabel}
        </Text>
      </View>
    </View>
  );
}
