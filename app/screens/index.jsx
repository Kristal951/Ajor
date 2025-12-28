import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import useUserStore from "../../store/userStore";
import { useRouter } from "expo-router";
import { auth } from "../../lib/Firebase";

export default function Index() {
  const { logout, user } = useUserStore();
  const router = useRouter();
  console.log(auth.currentUser)

  const onLogout = async () => {
    try {
      await logout();
      router.replace("/auth"); // redirect immediately
    } catch (error) {
      console.log(error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text>hello {user?.name || "Guest"}</Text>
      <TouchableOpacity onPress={onLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
