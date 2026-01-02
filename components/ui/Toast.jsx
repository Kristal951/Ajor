// components/CustomToast.js
import React, { useEffect, useRef } from "react";
import { Animated, Text, View, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useToastStore from "../../store/toastStore";

export default function CustomToast() {
  const { toast, hideToast } = useToastStore();

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!toast) return;

    // Show animation
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(hideToast);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  const themes = {
    success: {
      color: "#4CAF50",
      icon: "check-circle",
    },
    error: {
      color: "#F44336",
      icon: "error",
    },
    warning: {
      color: "#FFC107",
      icon: "warning",
    },
    info: {
      color: "#2196F3",
      icon: "info",
    },
  };

  const theme = themes[toast.type || "info"];

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
      }}
      className="absolute bottom-20 left-4 right-4 z-50"
    >
      <View
        className="bg-white rounded-2xl flex-row items-center overflow-hidden"
        style={{
          elevation: 8,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 10,
        }}
      >
        <View style={{ backgroundColor: theme.color }} className="w-1 h-full" />
        <View className="flex-row items-center p-4 flex-1">
          <MaterialIcons
            name={theme.icon}
            size={26}
            color={theme.color}
            style={{ marginRight: 12 }}
          />

          <View className="flex-1">
            {toast.description && (
              <Text className="text-[14px] text-gray-600 mt-1">
                {toast.description}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
