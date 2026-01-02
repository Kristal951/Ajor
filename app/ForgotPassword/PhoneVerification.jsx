import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CountryPicker from "react-native-country-picker-modal";
import NavigationDots from "../../components/NavigationDots";
import ArrowRightButton from "../../components/ui/ArrowRightButton";
import useForgotPasswordStore from "../../store/forgotPasswordStore";
import { useRouter } from "expo-router";
import {
  parsePhoneNumberFromString,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
  getExampleNumber,
} from "libphonenumber-js";
import useToastStore from "../../store/toastStore";

export default function PhoneVerification() {
  const [countryCode, setCountryCode] = useState("NG");
  const [callingCode, setCallingCode] = useState("234");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryName, setCountryName] = useState("Nigeria");

  const { activeStep, totalSteps, nextStep, prevStep, setActiveStep, skip } =
    useForgotPasswordStore();
  const { showToast } = useToastStore();
  const router = useRouter();

  const validatePhoneNumber = () => {
    const fullPhone = `+${callingCode}${phoneNumber}`;

    if (!phoneNumber) {
      return "Phone number is required";
    }

    if (!isPossiblePhoneNumber(fullPhone)) {
      return `Invalid phone number length for ${countryName}`;
    }

    if (!isValidPhoneNumber(fullPhone)) {
      return `Enter a valid ${countryName} phone number`;
    }

    return "";
  };

  if(phoneError){
    showToast({
      type: "error",  
      message: "Invalid Phone Number",
      description: phoneError,
    });
  }

  const isValid = !validatePhoneNumber();

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode?.[0] ?? "");
    setCountryName(country.name.common);
  };

  const moveToPrevScreen = () => {
    router.back();
    prevStep();
  };
  const moveToNextScreen = () => {
    const error = validatePhoneNumber();

    if (error) {
      setPhoneError(error);
      return;
    }

    setPhoneError("");
    router.push({
      pathname: "/ForgotPassword/VerifyPhoneCode",
      params: { phone: `+${callingCode}${phoneNumber}` },
    });
    nextStep();
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
          <Text className="font-katanmruy text-small">Phone Verification</Text>
        </View>
      </View>
      <View className="w-full flex flex-col gap-6">
        <Text className="text-bold font-geistBold w-[70%]">
          Enter Your Phone Number
        </Text>

        <Text className="text-small font-katanmruy w-[80%]">
          Put in your correct phone number linked to your Ajor Account to get a
          verification code.
        </Text>
      </View>

      <View className="flex-row items-center border border-gray-300 p-2 rounded">
        <CountryPicker
          countryCode={countryCode}
          withCallingCode
          withFlag
          withFilter
          withEmoji
          flagType="emoji"
          onSelect={onSelect}
        />

        <Text className="ml-2">+{callingCode}</Text>

        <View className="border-[#EBEBEB] border-l h-full mx-2" />

        <TextInput
          className="flex-1"
          keyboardType="phone-pad"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View className="w-full flex-1 justify-end flex-col gap-6 items-start mb-10">
        <NavigationDots total={totalSteps} activeIndex={activeStep} />
        <ArrowRightButton onPress={moveToNextScreen} disabled={!isValid} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
