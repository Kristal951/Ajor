import { TextInput, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isDisabled = !email || !password || !email.includes("@") || password.length < 6

  return (
    <View className="w-full mt-12 gap-6">
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        className="w-full p-4 border border-gray-300 font-katanmruy rounded-lg text-base bg-white"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        className="w-full p-4 border border-gray-300 font-katanmruy rounded-lg text-base bg-white"
        secureTextEntry
        autoCapitalize="none"
      />

      <View className="w-full items-end">
        <Text className="text-black/50 font-katanmruy">
          Forgot Password?
        </Text>
      </View>

      <TouchableOpacity
        className={`${isDisabled ? 'bg-primary/30' : 'bg-primary'} p-4 flex justify-center items-center rounded-lg`}
        disabled={isDisabled}
      >
        <Text className="text-white text-normal font-katanmruy">
          Log In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
