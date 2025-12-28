import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import CountryPicker, {
  Country,
} from "react-native-country-picker-modal";

export default function PhoneInput() {
  const [countryCode, setCountryCode] = useState("NG");
  const [callingCode, setCallingCode] = useState("234");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode?.[0] ?? "");
  };

  return (
    <View className="w-full px-6 mt-12 gap-6">
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

      <TouchableOpacity className="bg-primary p-4 rounded-lg items-center">
        <Text className="text-white font-katanmruy">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}