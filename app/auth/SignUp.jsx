import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import LoginForm from "../../components/LoginForm";
import SignUpForm from "../../components/SignUpForm";

export default function SignUp() {
  const router = useRouter();

  return (
    <View className="gap-6">
      <SignUpForm />

      <TouchableOpacity onPress={() => router.push("/auth/Login")}>
        <Text className="text-primary text-center">
          Have an account? Log In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
