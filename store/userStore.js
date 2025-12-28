import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { create } from "zustand";
import { API } from "../Utils";
import { auth } from "../lib/Firebase";

const useUserStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  firebaseUser: null,

  // ================= SIGN UP =================
  signUp: async (name, email, password) => {
    set({ loading: true });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await sendEmailVerification(user);

      const token = await user.getIdToken();

      const response = await API.post(
        "/user/register",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set({
        user: {
          ...response.data.user,
          emailVerified: false,
          hasPin: false,
        },
        isAuthenticated: false, // 👈 important
      });

      return "Signup successful! Please Create Your App Pin.";
    } catch (error) {
      console.error("Signup error:", error);

      let message = "Something went wrong. Please try again.";

      if (error?.response?.data?.error) {
        message = error.response.data.error;
      } else if (error?.message) {
        message = error.message;
      }

      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  // ================= LOGIN =================
  login: async (email, password) => {
    set({ loading: true });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      // if (!user.emailVerified) {
      //   throw new Error("Please verify your email before logging in.");
      // }

      const token = await user.getIdToken();

      const response = await API.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({
        user: response.data.user,
        isAuthenticated: true,
      });

      return "Login successful!";
    } catch (error) {
      console.log("Login error:", error);

      let message = "Something went wrong.";

      if (error?.message) {
        const msg = error.message.toLowerCase();
        if (msg.includes("user-not-found"))
          message = "No account found with this email.";
        else if (msg.includes("wrong-password"))
          message = "Incorrect password.";
        else if (msg.includes("auth/invalid-credential"))
          message = "Incorrect credentials.";
        else message = error.message;
      }

      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  // ================= CREATE PIN =================
  createUserPin: async (pin) => {
    set({ loading: true });

    try {
      if (!/^\d{4}$/.test(pin)) {
        throw new Error("PIN must be 4 digits.");
      }

      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const token = await user.getIdToken();

      await API.post(
        "/user/create-pin",
        { pin },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set((state) => ({
        user: { ...state.user, hasPin: true },
      }));

      return "PIN created successfully!";
    } catch (error) {
      let message = "Failed to create PIN.";

      if (error?.response?.data?.error) {
        message = error.response.data.error;
      } else if (error?.message) {
        message = error.message;
      }

      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  // ================= VERIFY PIN =================
  verifyUser: async (pin) => {
    set({ loading: true });

    try {
      if (!/^\d{4}$/.test(pin)) {
        throw new Error("PIN must be 4 digits.");
      }

      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const token = await user.getIdToken();

      await API.post(
        "/user/verify-pin",
        { pin },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set((state) => ({
        user: { ...state.user },
        isAuthenticated: true,
      }));

      return "PIN verified successfully!";
    } catch (error) {
      let message = "Failed to verify PIN.";

      if (error?.response?.data?.error) {
        message = error.response.data.error;
      } else if (error?.message) {
        message = error.message;
      }

      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  // ================= LOGOUT =================
  logout: async () => {
    await auth.signOut();
    set({ user: null, isAuthenticated: false });
  },

  //  ==================== INIT USER =============
  initAuthListener: () => {
    set({ loading: true });

    onAuthStateChanged(auth, async (firebaseUser) => {
      console.log(firebaseUser)
      if (!firebaseUser) {
        set({ user: null, firebaseUser: null, loading: false });
        return;
      }

      set({ firebaseUser, loading: true });

      try {
        const token = await firebaseUser.getIdToken();
        const response = await API.get("/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        set({ user: response.data.user, loading: false });
      } catch (err) {
        console.error("Failed to hydrate user:", err);
        set({ user: null, loading: false });
      }
    });
  },
}));

export default useUserStore;
