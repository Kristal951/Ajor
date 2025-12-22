import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function VerificationLayout() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-Bg" edges={["bottom"]}>
      <View className="px-6 flex flex-row items-center mt-32 justify-between w-full">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 w-12 h-12 justify-center items-center bg-primary/10 rounded-2xl"
        >
          <Image
            source={require("../../assets/ArrowLeft_2.png")}
            className="w-[70%] h-[70%]"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center">
          <Image
            source={require("../../assets/Ajor_2.png")}
            className="w-[80%] h-12"
            resizeMode="contain"
          />
        </View>
      </View>

      <View className="w-full flex-1 px-6 mt-8">
        <Slot />
      </View>
    </SafeAreaView>
  );
}
