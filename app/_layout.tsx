import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "@/context/Auth";
import { useFonts } from "expo-font";
import { Slot, Stack, router } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
  });
  // const isAuthorized = true ;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    router.navigate("/signin");
  }, []);

  return (
    <AuthProvider>
      <ApplicationProvider
        {...eva}
        theme={eva.light}
      >
        <Slot />
      </ApplicationProvider>
    </AuthProvider>
  );
}
