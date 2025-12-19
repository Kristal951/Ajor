import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationDots from "../../components/NavigationDots";
import { useRouter } from "expo-router";
import useOnboardingStore from "../../store/onboardingStore";

export default function Onboarding3() {
  const router = useRouter();
  const { activeStep, totalSteps,  prevStep, setActiveStep, skip } =
    useOnboardingStore();

  return (
    <SafeAreaView
      className="flex-1 justify-start h-full items-start"
      edges={["bottom"]}
    >
      <View className="flex flex-col gap-10 w-full m-0 h-[50%]">
        <View className="h-full relative w-full bg-primary rounded-b-[20%] overflow-hidden">
          <Image
            source={require("../../assets/phone-hologram-cybersecurity-nig_1.png")}
            resizeMode="cover"
            className="w-full h-full absolute top-0 bottom-0 left-0 right-0"
          />
        </View>
      </View>

      <View className="w-full h-max mt-[10%] gap-6 justify-center p-6">
        <View className="flex flex-col gap-8 px-2">
          <View className="w-[70%]">
            <Text className="text-bold font-geistBold text-secondary">
              Secure & Trusted
            </Text>
          </View>

          <View className="w-[90%]">
            <Text className="font-katanmruy text-left text-small">
              Your money is handled by licensed partners, so you can save
              confidently knowing everything is safe and transparent.
            </Text>
          </View>
        </View>

        <View className="flex justify-start items-start p-6">
          <NavigationDots
            total={totalSteps}
            activeIndex={activeStep}
          />
        </View>

        <TouchableOpacity className="w-full p-4 bg-primary rounded-lg justify-center items-center">
            <Text className="text-white text-normal">Get Started</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
