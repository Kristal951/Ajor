import React from "react";
import { View } from "react-native";

export default function NavigationDots({ total, activeIndex }) {
  return (
    <View className="flex-row justify-center gap-2 items-center space-x-2 mt-4 px-6">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`${index === activeIndex ? 'w-8' : 'w-3'} h-3 rounded-full ${
            index === activeIndex ? "bg-primary" : "bg-gray-300"
          }`}
        />
      ))}
    </View>
  );
}
