import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function VerifyPhoneNumber() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 mt-14">
        <Text className="text-semiBold font-geistSemiBold mb-2 text-left">
          Verify Phone Number
        </Text>
        <Text className="text-left text-gray-500">
          Please verify the code we just send to your number 09173799345
        </Text>

        <View className="flex-row justify-between mt-8 gap-4 w-[80%]">
          {[0, 1, 2, 3].map((_, i) => (
            <TextInput
              key={i}
              className="bg-accent border border-black/10 text-center text-lg w-20 h-16 rounded-lg"
              maxLength={1}
              keyboardType="number-pad"
            />
          ))}
        </View>

        <TouchableOpacity className="bg-primary py-3 px-10 rounded-xl mt-12">
          <Text className="text-white font-bold text-center">Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
