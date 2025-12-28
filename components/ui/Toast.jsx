// components/CustomToast.js
import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useToastStore from "../../store/toastStore";

export default function CustomToast() {
  const { toast, hideToast } = useToastStore();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => hideToast());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  const colors = {
    success: { bg: "#4CAF50", icon: "#C8E6C9" },
    error: { bg: "#F44336", icon: "#FFCDD2" },
    warning: { bg: "#FFC107", icon: "#FFF8E1" },
    info: { bg: "#333333", icon: "#FFFFFF" },
  };

  const type = toast.type || "info";
  const bgColor = colors[type].bg;
  const iconColor = colors[type].icon;

  let iconName = "info";
  if (type === "success") iconName = "check-circle";
  else if (type === "error") iconName = "error";
  else if (type === "warning") iconName = "warning";

  return (
    <Animated.View
      style={{  backgroundColor: '#fffff' }}
      className="absolute bottom-20 left-5 right-5 flex flex-row items-center p-2 rounded-lg z-50"
    >
      <MaterialIcons
        name={iconName}
        size={24}
        color={iconColor}
        style={{ marginRight: 8 }}
      />
      <View className="w-full h-max flex justify-center">
        {/* <Text className="text-white font-bold text-[17px]">{toast.message}</Text> */}
        {toast.description && (
          <Text style={{ color: bgColor}} className=" text-[15px] font-katanmruy mt-1 text-left">{toast.description}</Text>
        )}
      </View>
    </Animated.View>
  );
}
