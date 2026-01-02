import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import useUserStore from "../../store/userStore";
import useToastStore from "../../store/toastStore";
import CodeInput from "../../components/ui/CodeInput";

export default function VerifyPin() {
  const router = useRouter();
  const { verifyUserPin, loading, user } = useUserStore();
  const { showToast } = useToastStore();
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [pin, setPin] = useState(["", "", "", ""]);

  const isPinComplete = pin.every((digit) => digit !== "");
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < pin.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !pin[index]) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (!isPinComplete) {
      return showToast({
        type: "info",
        message: "Info!",
        description: "Incomplete Pin",
      });
    }

    try {
      await verifyUserPin(pin.join(""));
      router.replace({
        pathname: "/screens/AccountReadyScreen",
        params: {
          title: `Welcome Back ${user.name}`,
          subText:
            "Your goals are still right where you left them. save the smart way with Ajor",
          buttonText: "Go to Dashboard",
        },
      });

      return showToast({
        type: "success",
        message: "Success!",
        description: "Verified Your Pin Succesffully.",
      });
    } catch (error) {
      return showToast({
        type: "error",
        message: "Error!",
        description: error.message,
      });
    }
  };

  return (
    <View className="flex-1 px-6 mt-10">
      <Text className="font-geistSemiBold mb-2 text-center text-semiBold">
        Input your 4-digit PIN
      </Text>

      <Text className="text-center text-gray-500 text-small font-katanmruy">
        Input your 4-digit PIN to log into your Account.
      </Text>

      <View className="flex-row gap-4 justify-center mt-8">
        {pin.map((digit, i) => (
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

      <TouchableOpacity
        disabled={loading || !isPinComplete}
        onPress={handleSubmit}
        className={`py-3 px-10 rounded-xl mt-20 flex items-center justify-center ${
          loading || !isPinComplete ? "bg-primary/30" : "bg-primary"
        }`}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-normal font-KatanmruySemiBold text-center">
            Continue
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
