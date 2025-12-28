import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function AccountReadyScreen() {
  const { title = "", subText = "", buttonText = "Continue" } = useLocalSearchParams();
  const router = useRouter();

  const renderTitle = () => {
    if (title.includes("Welcome Back")) {
      const lastWord = title.split(" ").slice(-1)[0];
      return (
        <>
          Welcome Back{" "}
          <Text className="text-primary font-geistBold">{lastWord}!</Text>
        </>
      );
    }

    if (title.includes("Ajor Account")) {
      return (
        <>
          Your{" "}
          <Text className="text-primary font-geistBold">Ajor Account</Text>{" "}
          is ready
        </>
      );
    }

    return <Text>{title}</Text>;
  };

  // Helper for dynamic subText
  const renderSubText = () => {
    if (subText.includes("Ajor")) {
      return (
        <>
          Your goals are still right where you left them. Save the smart way
          with <Text className="text-primary">Ajor.</Text>
        </>
      );
    }
    return subText;
  };

  return (
    <SafeAreaView className="flex-1 flex-col justify-between px-6 py-4">
      <View className="w-full h-[20%] flex items-center justify-center">
        <Image
          source={require("../../assets/Ajor_2.png")}
          resizeMode="cover"
          className=""
        />
      </View>

      <View className="w-full h-max items-center justify-start">
        <View className="w-max h-max items-start justify-start relative">
          <View className="absolute w-[230px] h-[230px] rounded-full overflow-hidden -top-[60%] -right-[6rem] -z-10">
            <LinearGradient
              colors={["rgba(76,175,80,0.25)", "#ffffff"]}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0.4, y: 0.9 }}
              className="w-full h-full"
            />
          </View>
        </View>

        <Image
          source={require("../../assets/CheckMark.png")}
          resizeMode="cover"
          className=""
        />
      </View>

      <View className="w-full items-start">
        <Text className="text-bold font-geistBold mb-2 w-[90%]">{renderTitle()}</Text>
        <Text className="text-gray-600 text-sm font-katanmruy w-[80%]">{renderSubText()}</Text>
      </View>

      <TouchableOpacity
        onPress={() => router.replace("/screens/")}
        className="bg-primary p-4 rounded-2xl mb-4"
      >
        <Text className="text-white text-normal font-katanmruy text-center">
          {buttonText}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
