import React from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import FlashMessage from "react-native-flash-message";
import CustomToast from "../components/ui/Toast";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const prepare = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <CustomToast />
    </>
  );
}
