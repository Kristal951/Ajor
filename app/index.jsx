import { Image, StyleSheet, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import "../global.css"

export default function SplashScreen() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
   const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3;

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await Font.loadAsync({
          "Geist-Regular": require("../assets/fonts/Geist/Geist-Regular.ttf"),
          "Geist-Bold": require("../assets/fonts/Geist/Geist-Bold.ttf"),
          "Geist-SemiBold": require("../assets/fonts/Geist/Geist-SemiBold.ttf"),
          "Katanmruy-Regular": require("../assets/fonts/KantumruyPro/KantumruyPro-Regular.ttf"),
          "Katanmruy-Bold": require("../assets/fonts/KantumruyPro/KantumruyPro-Bold.ttf"),
          "Katanmruy-SemiBold": require("../assets/fonts/KantumruyPro/KantumruyPro-SemiBold.ttf"),
        });

        setIsReady(true);
      } catch (error) {
        console.warn("Failed to load assets:", error);
        setIsReady(true);
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        if (router) {
          router.replace("Onboarding");
        }
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isReady, router]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Ajor.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4DB151",
    gap: 10,
  },
  logo: {
    width: 250,
    height: 250,
  },
});
