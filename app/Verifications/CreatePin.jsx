import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function CreatePin() {
  const router = useRouter();

  return (
    <View className="flex-1">
      <View className="flex-1 mt-14">
        <Text className="text-semiBold font-geistSemiBold mb-2 text-center">
          Create A 4-digit PIN
        </Text>
        <Text className="text-center text-gray-500">
          Used for withdrawals and settings. 
        </Text>

        <View className="flex-row justify-center mt-8 gap-4 w-full">
          {[0, 1, 2, 3].map((_, i) => (
            <TextInput
              key={i}
              className="bg-white border border-black/10 text-center text-lg w-[4.5rem] h-16 rounded-lg"
              maxLength={1}
              keyboardType="number-pad"
              // onFocus={()=> }
            />
          ))}
        </View>

        <TouchableOpacity className="bg-primary py-3 px-10 rounded-xl mt-20">
          <Text className="text-white font-KatanmruySemiBold text-normal text-center">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
