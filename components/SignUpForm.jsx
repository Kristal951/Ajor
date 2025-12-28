import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import useUserStore from "../store/userStore";
import useToastStore from "../store/toastStore";
import { useRouter } from "expo-router";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 6;
  const isDisabled =
    !name || !email || !password || !isEmailValid || !isPasswordValid;

  const { signUp, loading } = useUserStore();
  const { showToast } = useToastStore();
  const router = useRouter();

  const setFormEmpty = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = async () => {
    if (isDisabled) return;

    try {
      const res = await signUp(name, email, password);
      setFormEmpty();
      showToast({
        type: "success",
        message: "Success!",
        description:
          res ||
          res.data ||
          res.data.message ||
          "Your account has been created.",
      });
      router.push("/Verifications/CreatePin");
    } catch (error) {
      console.log(error);

      let description = "Something went wrong. Please try again.";

      if (error?.message) {
        const msg = error.message.toLowerCase();

        if (msg.includes("email-already-in-use")) {
          description = "This email is already registered.";
        } else if (msg.includes("invalid-email")) {
          description = "Invalid email address.";
        } else if (msg.includes("weak-password")) {
          description = "Password should be at least 6 characters.";
        } else {
          description = error.message;
        }
      }

      showToast({
        type: "error",
        message: "Error!",
        description,
      });
    }
  };

  return (
    <View className="w-full mt-12 gap-6">
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        className="w-full p-4 border border-gray-300 font-katanmruy rounded-lg text-base bg-white"
        autoCapitalize="words"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        className={`${email && !isEmailValid ? "border-red-500" : "border-gray-300"} ${email && isEmailValid ? "border-primary" : "border-gray-300"} w-full p-4 border  font-katanmruy rounded-lg text-base bg-white`}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {email && !isEmailValid && (
        <Text className="text-red-500 text-sm font-katanmruy">
          Please enter a valid email address
        </Text>
      )}

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        className={`${password && !isPasswordValid ? "border-red-500" : "border-gray-300"} ${password && isPasswordValid ? "border-primary" : "border-gray-300"} w-full p-4 border border-gray-300 font-katanmruy rounded-lg text-base bg-white`}
        secureTextEntry
        autoCapitalize="none"
      />

      {password && !isPasswordValid && (
        <Text className="text-red-500 text-sm font-katanmruy">
          Password must be at least 6 characters
        </Text>
      )}
      {name && email && password && isEmailValid && isPasswordValid && (
        <Text className="text-primary text-sm font-katanmruy">
          Everything looks good
        </Text>
      )}

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
          <Text className="text-white text-normal font-katanmruy">Sign Up</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
