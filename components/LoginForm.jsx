import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import useUserStore from "../store/userStore";
import useToastStore from "../store/toastStore";
import { useRouter } from "expo-router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useUserStore();
  const { showToast } = useToastStore();
  const router = useRouter()

  const setFormEmpty = () => {
    setEmail("");
    setPassword("");
  };

  const isDisabled =
    !email || !password || !email.includes("@") || password.length < 6;

  const handleSubmit = async () => {
    if (isDisabled) return;

    try {
      const res = await login(email, password);
      setFormEmpty();
      showToast({
        type: "success",
        message: "Success!",
        description: res || "Login successful.",
      });
      router.push('/Others/VerifyPin')
    } catch (error) {
      console.log("Login error:", error);
      showToast({
        type: "error",
        message: "Error!",
        description: error?.message || "Something went wrong.",
      });
    }
  };

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

      <TouchableOpacity onPress={()=> router.push('/ForgotPassword')} className="w-full items-end">
        <Text className="text-black/50 font-katanmruy">Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isDisabled || loading}
        className={`p-4 flex justify-center items-center rounded-lg ${
          isDisabled ? "bg-primary/30" : "bg-primary"
        }`}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-white text-normal font-katanmruy">Log In</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
