import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  const router = useRouter();

  return (
    <View className="gap-6">
      <LoginForm />

      <TouchableOpacity onPress={() => router.push("/auth/SignUp")}>
        <Text className="text-primary text-center">
          Don’t have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
