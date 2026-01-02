import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Keyboard, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

import CodeInput from "../../components/ui/CodeInput";
import NavigationDots from "../../components/NavigationDots";
import ArrowRightButton from "../../components/ui/ArrowRightButton";

import useForgotPasswordStore from "../../store/forgotPasswordStore";
import useToastStore from "../../store/toastStore";

export default function VerifyEmailCode() {
  const [pin, setPin] = useState("");
  const inputsRef = useRef([]);

  const {
    activeStep,
    totalSteps,
    nextStep,
    prevStep,
    cooldown,
    tickCooldown,
    verifyPasswordResetCodeViaEmail,
    requestPassWordResetViaEmail,
    loading,
  } = useForgotPasswordStore();

  const { showToast } = useToastStore();
  const router = useRouter();
  const { email } = useLocalSearchParams();

  // ================= VALIDATE EMAIL PARAM =================
  useEffect(() => {
    if (!email) {
      showToast({
        type: "error",
        message: "Invalid request",
        description: "Email not found. Please restart password recovery.",
      });
      router.back();
    }
  }, [email]);

  // ================= AUTO DISMISS KEYBOARD =================
  useEffect(() => {
    if (pin.length === 4) {
      Keyboard.dismiss();
    }
  }, [pin]);

  // ================= COOLDOWN TIMER =================
  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      tickCooldown();
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  // ================= INPUT HANDLERS =================
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const pinArray = pin.padEnd(4, " ").split("");
    pinArray[index] = value;

    const newPin = pinArray.join("").trimEnd();
    setPin(newPin);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !pin[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // ================= NAVIGATION =================
  const moveToPrevScreen = () => {
    router.back();
    prevStep();
  };

  const moveToNextScreen = () => {
    router.push({
      pathname: "/ForgotPassword/ResetPassword",
      params: { email, otp: pin },
    });
    nextStep();
  };

  // ================= VERIFY OTP =================
  const handleSubmit = async () => {
    if (pin.length !== 4) {
      showToast({
        type: "error",
        message: "Invalid Code",
        description: "Please enter the 4-digit code.",
      });
      return;
    }

    try {
      await verifyPasswordResetCodeViaEmail(email, pin);
      moveToNextScreen();
    } catch (error) {
      showToast({
        type: "error",
        message: "Verification Failed",
        description: error.message,
      });
    }
  };

  const handleResend = async () => {
    try {
      await requestPassWordResetViaEmail(email);
      showToast({
        type: "success",
        message: "OTP Sent",
        description: "A new verification code has been sent to your email.",
      });

      setPin("");
      inputsRef.current[0]?.focus();
    } catch (error) {
      showToast({
        type: "error",
        message: "Resend Failed",
        description: error.message,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 mt-10">
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
          Verify Your Email Address
        </Text>

        <Text className="text-small font-katanmruy w-[80%]">
          Enter the 4-digit code we sent to your email address ({email}).
        </Text>
      </View>

      <View className="flex-row gap-4 justify-start mt-8">
        {[0, 1, 2, 3].map((_, i) => (
          <CodeInput
            key={i}
            i={i}
            pin={pin}
            setPin={setPin}
            inputsRef={inputsRef}
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
          />
        ))}
      </View>

      <View className="mt-8 items-center">
        <TouchableOpacity
          disabled={cooldown > 0 || loading}
          onPress={handleResend}
          className={`p-4 rounded-lg ${
            cooldown > 0 ? "bg-gray-300" : "bg-primary"
          }`}
        >
          <Text className="text-white font-bold">
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full flex-1 justify-end flex-col gap-6 items-start mb-10">
        <NavigationDots total={totalSteps} activeIndex={activeStep} />
        <ArrowRightButton onPress={handleSubmit} loading={loading} />
      </View>
    </SafeAreaView>
  );
}
