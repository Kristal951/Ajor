import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session"; 
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../lib/Firebase";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleSignIn() {
 const redirectUri = AuthSession.makeRedirectUri({ useProxy: true }); 
 
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    redirectUri,
  });
  const signInWithGoogle = async () => {
    const result = await promptAsync();

    if (result.type === "success") {
      const { id_token } = result.params;
      const credential = GoogleAuthProvider.credential(id_token);
      const userCredential = await signInWithCredential(auth, credential);
      return userCredential.user;
    } else {
      throw new Error("Google Sign-In cancelled or failed");
    }
  };

  return { signInWithGoogle, request, response };
}
