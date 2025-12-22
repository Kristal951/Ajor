import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

export default function PhoneInput() {
  const [countryCode, setCountryCode] = useState("US");
  const [callingCode, setCallingCode] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View className="w-full px-6 mt-12 gap-6">
      <View className="flex-row items-center border border-gray-300 p-2 rounded">
        <CountryPicker
          countryCode={countryCode}
          withCallingCode
          withFlag
          withFilter
          withEmoji
          onSelect={(country) => {
            setCountryCode(country.cca2);
            setCallingCode(country.callingCode[0]);
          }}
        />
        <Text className="ml-2">+{callingCode}</Text>
        <View className="border-[#EBEBEB] border-l-[1px] h-full ml-[5px]"/>
        <TextInput
          className="ml-2 flex-1"
          keyboardType="phone-pad"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View>
        <TouchableOpacity className="bg-primary p-4 flex justify-center items-center rounded-lg">
          <Text className="text-white text-normal font-katanmruy">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
