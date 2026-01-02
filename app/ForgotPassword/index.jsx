import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import ArrowRightButton from "../../components/ui/ArrowRightButton";
import useForgotPasswordStore from "../../store/forgotPasswordStore";
import NavigationDots from "../../components/NavigationDots";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
  const [recoveryMethod, setRecoveryMethod] = useState("phone");
  const { activeStep, totalSteps, nextStep, prevStep, setActiveStep, skip } =
    useForgotPasswordStore();
  const router = useRouter();

  useEffect(() => {
    setActiveStep(0);
  }, [setActiveStep]);

  const moveToNextScreen = () => {
    nextStep()
    if(recoveryMethod === "phone") {
      router.push("/ForgotPassword/PhoneVerification");
    }else{
      router.push("/ForgotPassword/MailVerification");
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-start items-start px-6">
      <View className="flex flex-row items-center mt-8 justify-between w-full mb-10">
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
          <Text className="font-katanmruy text-small">Forgot Password</Text>
        </View>
      </View>
      <View className="w-full flex flex-col gap-6">
        <Text className="text-bold font-geistBold w-[50%]">
          Forgot Your Password?
        </Text>

        <Text className="text-small font-katanmruy w-[80%]">
          Select email or phone number to get a verification code.
        </Text>
      </View>

      <View className="flex flex-wrap h-[18%] flex-row gap-10 justify-between items-center mt-10">
        <TouchableOpacity
          onPress={() => setRecoveryMethod("phone")}
          className={`w-[42%] h-full flex flex-col justify-between transition-colors duration-150 p-4 ${recoveryMethod === "phone" ? "bg-primary" : "bg-white"} rounded-2xl`}
        >
          <View
            className={`p-2 ${recoveryMethod === "phone" ? "bg-white" : "bg-primary/20"} rounded-full w-14 h-14 flex justify-center items-center mb-4`}
          >
            <Image
              source={require("../../assets/line-md_phone-filled.png")}
              resizeMode="cover"
              className="w-[80%] h-[80%]"
            />
          </View>
          <Text
            className={`${recoveryMethod === "phone" ? "text-white" : "text-black"} font-katanmruy text-small`}
          >
            Get the code via Phone.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRecoveryMethod("email")}
          className={`w-[42%] h-full flex flex-col justify-between transition-colors duration-150 p-4 ${recoveryMethod === "email" ? "bg-primary" : "bg-white"} rounded-2xl`}
        >
          <View
            className={`p-2 ${recoveryMethod === "email" ? "bg-white" : "bg-primary/20"} rounded-full w-14 h-14 flex justify-center items-center mb-4`}
          >
            <Image
              source={require("../../assets/tabler_mail-filled.png")}
              resizeMode="cover"
              className="w-[80%] h-[80%]"
            />
          </View>
          <Text
            className={`${recoveryMethod === "email" ? "text-white" : "text-black"} font-katanmruy text-small`}
          >
            Get the code via Mail.
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full flex-1 justify-end items-start mb-10 flex-col gap-6">
        <NavigationDots total={totalSteps} activeIndex={activeStep} />
        <ArrowRightButton onPress={moveToNextScreen}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
