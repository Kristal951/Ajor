import { Image, TouchableOpacity, View, ActivityIndicator } from "react-native";
import React from "react";

export default function ArrowRightButton({ onPress, loading, disabled }) {
  return (
    <View className="p-6">
      <TouchableOpacity
        onPress={onPress}
        // disabled={loading || disabled} 
        className="bg-primary p-4 rounded-full w-[60px] h-[60px] flex justify-center items-center"
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Image
            source={require("../../assets/arrow_right.png")}
            className="w-[12px] h-[21px]"
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
