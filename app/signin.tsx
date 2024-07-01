import AuthScreen from "@/components/auth/AuthScreen";
import { useAuth } from "@/context/Auth";
import { router } from "expo-router";

export default function SignIn() {
  const auth = useAuth();

  return (
    <AuthScreen
      title={"Sign In"}
      onSubmit={async ({ email, password }) => {
        const response = await auth.login(email, password);
        console.log(response);
        // router.navigate("/home");
      }}
      navigationAction={() => {
        router.navigate("/signup");
      }}
      navigationLabel="Don't have an account? Sign up"
      subTitle='Welcome to app'
    />
  );
}
