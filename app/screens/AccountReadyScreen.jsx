import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function AccountReadyScreen() {
  return (
    <SafeAreaView className="flex flex-1 flex-col justify-between px-6 py-4">
      <View className="w-full h-[20%] flex items-center justify-center">
        <Image
          source={require("../../assets/Ajor_2.png")}
          resizeMode="cover"
          className=""
        />
      </View>

      <View className="w-full h-max items-center justify-start">
        <View className="w-max h-max items-start justify-start relative">
          <View className="absolute w-[230] h-[230] rounded-full overflow-hidden -top-[60%] -right-[6rem] -z-10">
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

      <View className="w-full h-max">
        <Text className="text-bold font-geistBold">
          Your{" "}
          <Text className="text-primary text-bold font-geistBold">
            Ajor Account
          </Text>{" "}
          is ready
        </Text>

        <Text className="text-left w-[72%] mt-4 font-katanmruy">
          You can now start saving toward the things that matter to you,
          automatically or whenever you want.
        </Text>
      </View>

      <TouchableOpacity className="bg-primary p-4 rounded-2xl mb-4">
        <Text className="text-white text-normal font-katanmruy text-center">
          View Dashboard
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
