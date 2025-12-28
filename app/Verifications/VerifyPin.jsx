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

export default function VerifyPin() {
  const router = useRouter();
  const { verifyUser, loading, user } = useUserStore();
  const { showToast } = useToastStore();

  const [pin, setPin] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(null);

  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      const newPin = [...pin];

      if (pin[index] === "") {
        if (index > 0) {
          inputs.current[index - 1]?.focus();
          newPin[index - 1] = "";
          setPin(newPin);
        }
      } else {
        newPin[index] = "";
        setPin(newPin);
      }
    }
  };

  const isPinComplete = pin.every((digit) => digit !== "");

  const handleSubmit = async () => {
    if (!isPinComplete) {
      return showToast({
        type: "info",
        message: "Info!",
        description: "Incomplete Pin",
      });
    }

    try {
      await verifyUser(pin.join(""));
      router.replace({
        pathname: "/screens/AccountReadyScreen",
        params: {
          title: `Welcome Back ${user.name}`,
          subText:
            "Your goals are still right where you left them. save the smart way with Ajor",
            buttonText: 'Go to Dashboard'
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
          <View
            key={i}
            className={`rounded-2xl w-[65px] h-[56px] p-[2px] flex items-center justify-center
            
        ${focusedIndex === i ? "border-2 border-black/10" : "bg-accent"}
      `}
          >
            <TextInput
              ref={(ref) => (inputs.current[i] = ref)}
              value={digit}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(v) => handleChange(v, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              onFocus={() => setFocusedIndex(i)}
              className={`w-[98%]  h-full rounded-xl text-center text-3xl font-katanmruy      ${
                digit ? "bg-white" : "bg-accent"
              }`}
              textAlign="center"
            />
          </View>
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
