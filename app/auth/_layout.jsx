import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Slot, useRouter } from "expo-router";

export default function AuthLayout() {
  const GoogleIcon = require("../../assets/Google_Icon.png");
  const AppleIcon = require("../../assets/Apple_Icon.png");
  const PhoneIcon = require("../../assets/Phone_Icon.png");

  const OtherAuthenticationMethods = [
    { label: "Continue With Google", icon: GoogleIcon },
    { label: "Continue With Apple", icon: AppleIcon },
    // { label: "Continue With Phone Number", icon: PhoneIcon },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <View className="flex-1 relative">
        <Image
          source={require("../../assets/Woman-holding-money.png")}
          resizeMode="cover"
          className="w-full h-[70%]"
        />

        <LinearGradient
          colors={["rgba(255,255,255,0)", "#FFFFFF"]}
          locations={[0.2, 0.50]}
          className="absolute top-0 w-full h-[70%]"
          pointerEvents="none"
        />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: "30%",
            paddingBottom: 140,
          }}
          className="px-6 absolute w-full top-[15%]"
        >
          <Image
            source={require("../../assets/Ajor_2.png")}
            resizeMode="contain"
            className="self-center mb-8"
          />
          <Slot />

          <View className="mt-8 gap-4">
            {OtherAuthenticationMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                className="p-4 rounded-lg flex-row items-center justify-center gap-4 bg-[#EBEBEB]"
              >
                <Image
                  source={method.icon}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
                <Text className="font-katanmruySemiBold text-sm">
                  {method.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Footer */}
        <View className="absolute bottom-4 w-full flex-row justify-between px-14">
          <Text className="text-black/30 text-sm">Privacy Policy</Text>
          <Text className="text-black/30 text-sm">Terms of Service</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
