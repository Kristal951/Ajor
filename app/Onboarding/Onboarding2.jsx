import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationDots from "../../components/NavigationDots";
import { useRouter } from "expo-router";
import useOnboardingStore from "../../store/onboardingStore";

export default function Onboarding2() {
  const router = useRouter();
   const { activeStep, totalSteps, nextStep, prevStep, setActiveStep, skip } =
    useOnboardingStore();

  const moveToNextScreen =()=>{
    nextStep() 
    router.push('/Onboarding/Onboarding3')
  }
  const moveToPrevScreen =()=>{
    prevStep() 
    router.push('/Onboarding/Onboarding1')
  }

  return (
    <SafeAreaView
      className="flex-1 justify-start h-full items-start"
      edges={["bottom"]}
    >
      <View className="flex flex-col gap-10 w-full m-0 h-[50%]">
        <View className="h-full relative w-full bg-primary rounded-b-[20%] overflow-hidden">
          <Image
            source={require("../../assets/close-up-hand-putting-coin-jar-a_1.png")}
            resizeMode="cover"
            className="w-full h-full absolute top-0 bottom-0 left-0 right-0"
          />
        </View>
      </View>

      <View className="w-full h-max mt-[10%] gap-6 justify-center p-6">
        <View className="flex flex-col gap-8 px-2">
          <View className="w-[70%]">
            <Text className="text-bold font-geistBold text-secondary">
              Save at Your Own Pace
            </Text>
          </View>

          <View className="w-[90%]">
            <Text className="font-katanmruy text-left text-small">
              Whether your income is steady or flexible, Ajor adapts to you and
              helps you stay on track toward your goals.
            </Text>
          </View>
        </View>

        <View className="flex justify-start items-start p-6">
          <NavigationDots
            total={totalSteps}
            activeIndex={activeStep}
            onPress={(index) => setActiveStep(index)}
          />
        </View>

        <View className="flex-row w-full p-6 justify-between self-end items-center">
          <TouchableOpacity>
            <Text className="text-base text-gray-600">Skip</Text>
          </TouchableOpacity>

          <View className="flex flex-row gap-8">
            <TouchableOpacity
              onPress={moveToPrevScreen}
              className="bg-primary w-[60px] h-[60px] rounded-full flex justify-center items-center"
            >
              <Image
                source={require("../../assets/arrow_left.png")}
                className="w-[12px] h-[21px]"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={moveToNextScreen}
              className="bg-primary w-[60px] h-[60px] rounded-full flex justify-center items-center"
            >
              <Image
                source={require("../../assets/arrow_right.png")}
                className="w-[12px] h-[21px]"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
