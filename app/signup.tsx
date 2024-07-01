import AuthScreen from "@/components/auth/AuthScreen";
import { TDataRegisterUser, useAuth } from "@/context/Auth";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput } from "react-native";

export default function SignIn() {
  const { signup } = useAuth();

  const [displayName, setDisplayName] = useState("");

  const handleSignup = async (data: { email: string; password: string }) => {
    const response = await signup({ ...data, displayName });
    console.log(response);
    // router.navigate("/signin");
  };

  return (
    <AuthScreen
      title={"Sign up"}
      onSubmit={(data) => handleSignup(data)}
      navigationAction={() => {
        router.navigate("/signin");
      }}
      navigationLabel='Already have an account? Sign in'
    >
      <TextInput
        style={{
          height: 60,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          padding: 9
        }}
        placeholder='Username'
        value={displayName}
        onChangeText={(text) => {
          setDisplayName(text);
        }}
      />
    </AuthScreen>
  );
}
