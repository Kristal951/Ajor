import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  const router = useRouter();
  const moveToNextScreen =()=>{
    router.push('/Onboarding/Onboarding1')
  }

  return (
    <SafeAreaView className="flex-1 justify-start items-start" edges={["top"]}>
      <View className="w-full h-max mt-[20%] gap-6 justify-center p-6">
        <View>
          <Text className="text-bold font-geistBold text-secondary">
            Welcome To
          </Text>
          <Text className="text-bold font-geistBold text-primary">Ajor</Text>
        </View>

        <View className="w-[90%]">
          <Text className="font-katanmruy text-left text-small">
            A simple way to save money, stay consistent, and reach your goals
            without stress.
          </Text>
        </View>
      </View>

      <View className="flex flex-col gap-10 w-full m-0 h-[51%]">
        <View className="p-6 ">
          <TouchableOpacity
            onPress={moveToNextScreen}
            className="bg-primary p-4 rounded-full w-[60px] h-[60px] flex justify-center items-center"
          >
            <Image
              source={require("../../assets/arrow_right.png")}
              className="w-[12px] h-[21px] "
            />
          </TouchableOpacity>
        </View>
      
        <View className="h-full relative w-full bg-primary rounded-t-[20%] overflow-hidden">
          <Image
            source={require("../../assets/piggy-bank-holding-representation_1.png")}
            resizeMode="cover"
            className="w-full h-full absolute top-0 bottom-0 left-0 right-0 rounded-t-lg overflow-hidden"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
