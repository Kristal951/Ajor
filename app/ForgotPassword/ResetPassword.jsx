import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import NavigationDots from "../../components/NavigationDots";
import ArrowRightButton from "../../components/ui/ArrowRightButton";
import useForgotPasswordStore from "../../store/forgotPasswordStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import useUserStore from "../../store/userStore";
import useToastStore from "../../store/toastStore";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const {
    activeStep,
    totalSteps,
    nextStep,
    prevStep,
    resetPasswordViaEmail,
    loading,
  } = useForgotPasswordStore();
  const router = useRouter();
  const { email, otp } = useLocalSearchParams();
  const { showToast } = useToastStore();

  const moveToPrevScreen = () => {
    router.back();
    prevStep();
  };

  const handleSubmit = async () => {
    try {
      await resetPasswordViaEmail(email, otp, newPassword);
      showToast({
        type: "success",
        message: "Password Reset",
        description:
          "Your password has been reset successfully. Please login with your new password.",
      });
      router.push("/auth/Login");
    } catch (error) {
      showToast({
        type: "error",
        message: "Error",
        description: error?.message || "Something went wrong",
      });
    }
  };

  return (
    <SafeAreaView className="w-full flex-1 px-6 mt-12 gap-6">
      <View className="flex flex-row items-center mt-8 justify-between w-full mb-10">
        <TouchableOpacity
          onPress={moveToPrevScreen}
          className="p-2 w-12 h-12 justify-center items-center bg-primary/10 rounded-2xl"
        >
          <Image
            source={require("../../assets/ArrowLeft_2.png")}
            className="w-[70%] h-[70%]"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center">
          <Text className="font-katanmruy text-small">Mail Verification</Text>
        </View>
      </View>
      <View className="w-full flex flex-col gap-6">
        <Text className="text-bold font-geistBold w-[70%]">
          Reset Your Password
        </Text>

        <Text className="text-small font-katanmruy w-[80%]">
          Enter a new password that you will use to login to your account.
        </Text>
      </View>

      <View className="flex-row items-center rounded">
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          className="w-full p-4 border border-gray-300 font-katanmruy rounded-lg text-base bg-white"
          secureTextEntry
        />
      </View>

      <View className="w-full flex-1 justify-end flex-col gap-6 items-start mb-10">
        <NavigationDots total={totalSteps} activeIndex={activeStep} />
        <ArrowRightButton onPress={handleSubmit} loading={loading} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
