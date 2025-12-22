import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

export default function SignUpForm() {
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

      <View>
        <TouchableOpacity disabled={isDisabled} className={`${isDisabled ? 'bg-primary/30' : 'bg-primary'} p-4 flex justify-center items-center rounded-lg`}>
          <Text className="text-white text-normal font-katanmruy">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
