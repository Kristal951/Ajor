import {
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "expo-router";
import * as Font from "expo-font";
import useUserStore from "../store/userStore";
import "../global.css";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { user, initAuthListener } = useUserStore();
  const [isReady, setIsReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load fonts
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
      } catch (error) {
        console.warn("Failed to load assets:", error);
      } finally {
        setIsReady(true);
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const init = async () => {
      await initAuthListener(); // waits until user is loaded or null
      setHydrated(true);
    };

    init();
  }, [isReady]);

  useEffect(() => {
    if (!hydrated) return;
    console.log(hydrated);

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        if (!user) {
          router.replace("/auth/Login");
        } else if (user.hasPin) {
          router.replace("/Verifications/VerifyPin");
        } else {
          router.replace("/screens");
        }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [hydrated, user]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        source={require("../assets/Ajor.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#fff" />
    </Animated.View>
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
