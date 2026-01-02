import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Keyboard, Image } from "react-native";
import CodeInput from "../../components/ui/CodeInput";
import useForgotPasswordStore from "../../store/forgotPasswordStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import NavigationDots from "../../components/NavigationDots";
import ArrowRightButton from "../../components/ui/ArrowRightButton";
import useUserStore from "../../store/userStore";
import useToastStore from "../../store/toastStore";
import { useLocalSearchParams } from "expo-router";

export default function VerifyPhoneCode() {
  const [pin, setPin] = useState("");
  const [counter, setCounter] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef([]);
  const { activeStep, totalSteps, nextStep, prevStep, setActiveStep, skip } =
    useForgotPasswordStore();
  const { verifyPasswordResetCode, loading } = useUserStore();
  const { showToast } = useToastStore();
  const router = useRouter();
  const { phone } = useLocalSearchParams();

  useEffect(() => {
    if (!phone) {
      console.error("No phone passed in params!");
      router.back();
    }
  });

  useEffect(() => {
    if (pin.length === 4) {
      Keyboard.dismiss();
    }
  });

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [counter]);

  const handleResend = () => {
    console.log("Resend code triggered!");
    setCounter(30);
    setCanResend(false);
    setPin(["", "", "", ""]);
    inputsRef.current[0]?.focus();
  };

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
    if (e.nativeEvent.key === "Backspace") {
      if (pin[index] === "" && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const moveToPrevScreen = () => {
    router.back();
    prevStep();
  };

  const moveToNextScreen = () => {
    router.push({
      pathname: "/ForgotPassword/ResetPassword",
      params: { phone, otp: pin },
    });
    nextStep();
  };

  const handleSubmit = async () => {
    if (pin.length !== 4) {
      showToast({
        type: "error",
        message: "Invalid Code",
        description: "Please enter the 4-digit code",
      });
      return;
    }

    try {
      await verifyPasswordResetCode(email, pin);
      moveToNextScreen();
    } catch (error) {
      showToast({
        type: "error",
        message: "Error",
        description: error?.message || "Something went wrong",
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
          <Text className="font-katanmruy text-small">Phone Verification</Text>
        </View>
      </View>

      <View className="w-full flex flex-col gap-6">
        <Text className="text-bold font-geistBold w-[70%]">
          Verify Your Phone Number
        </Text>

        <Text className="text-small font-katanmruy w-[80%]">
          Enter the code we sent to your phone number to continue.
        </Text>
      </View>

      <View className="flex-row gap-4 justify-start mt-8">
        {[0, 1, 2, 3].map((digit, i) => (
          <CodeInput
            key={i}
            i={i}
            pin={pin}
            setPin={setPin}
            digit={digit}
            inputsRef={inputsRef}
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
          />
        ))}
      </View>

      <View className="mt-8 items-center">
        <TouchableOpacity
          className="w-full"
          onPress={handleResend}
          disabled={!canResend}
        >
          <Text
            className={` ${canResend ? "text-primary" : "text-primary/30"}`}
          >
            {canResend ? "Resend Code" : `Resend in ${counter}s`}
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
