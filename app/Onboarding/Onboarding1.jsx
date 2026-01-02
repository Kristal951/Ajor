import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationDots from "../../components/NavigationDots";
import { useRouter } from "expo-router";
import useOnboardingStore from "../../store/onboardingStore";
import ArrowLeftButton from "../../components/ui/ArrowLeftButton";
import ArrowRightButton from "../../components/ui/ArrowRightButton";

export default function Onboarding1() {
  const router = useRouter();
  const { activeStep, totalSteps, nextStep, prevStep, setActiveStep, skip } =
    useOnboardingStore();

  const moveToNextScreen = () => {
    nextStep();
    router.push("/Onboarding/Onboarding2");
  };

  const moveToPrevScreen = () => {
    prevStep();
    router.push("/Onboarding/");
  };

  return (
    <SafeAreaView
      className="flex-1 justify-start h-full items-start"
      edges={["bottom"]}
    >
      <View className="flex flex-col gap-10 w-full m-0 h-[50%]">
        <View className="h-full relative w-full bg-primary rounded-b-[20%] overflow-hidden">
          <Image
            source={require("../../assets/young-african-amercian-man-holding_1.png")}
            resizeMode="cover"
            className="w-full h-full absolute top-0 bottom-0 left-0 right-0"
          />
        </View>
      </View>

      <View className="w-full h-max mt-[10%] gap-6 justify-center p-6">
        <View className="flex flex-col gap-8 px-2">
          <View className="w-[70%]">
            <Text className="text-bold font-geistBold text-secondary">
              Saving Made Simple
            </Text>
          </View>

          <View className="w-[90%]">
            <Text className="font-katanmruy text-left text-small">
              Create goals, choose how often you save, and let Ajor help you
              build the habit without stress or confusion.
            </Text>
          </View>
        </View>

        <View className="flex justify-start items-start p-6">
          <NavigationDots
            total={totalSteps}
            activeIndex={activeStep}
            onPress={moveToNextScreen}
          />
        </View>

        <View className="flex-row w-full p-6 justify-between self-end items-center">
          <TouchableOpacity>
            <Text className="text-base text-gray-600">Skip</Text>
          </TouchableOpacity>

          <View className="flex flex-row gap-8">
            <ArrowLeftButton moveToPrevScreen={moveToPrevScreen} />
            <ArrowRightButton moveToNextScreen={moveToNextScreen} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
