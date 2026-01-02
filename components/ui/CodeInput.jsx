import { TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";

export default function CodeInput({
  i,
  pin,
  inputsRef,
  handleChange,
  handleKeyPress,
}) {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (i === 0) {
      inputsRef.current[i]?.focus();
    }
  }, []);

  const digit = pin?.[i] || "";

  return (
    <View
      className={`rounded-2xl w-[65px] h-[56px] p-[2px] flex items-center justify-center
        ${focused ? "border-2 border-black/10" : "bg-accent"}
      `}
    >
      <TextInput
        ref={(ref) => (inputsRef.current[i] = ref)}
        value={digit}
        maxLength={1}
        keyboardType="number-pad"
        onChangeText={(v) => handleChange(v, i)}
        onKeyPress={(e) => handleKeyPress(e, i)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-[98%] h-full rounded-xl text-center text-3xl font-katanmruy
          ${digit ? "bg-white" : "bg-accent"}
        `}
        textAlign="center"
      />
    </View>
  );
}
