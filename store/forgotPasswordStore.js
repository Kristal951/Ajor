import { create } from "zustand";
import { API } from "../Utils";

const useForgotPasswordStore = create((set, get) => ({
  activeStep: 0,
  totalSteps: 5,
  loading: false,
  cooldown: 0,

  setActiveStep: (step) => set({ activeStep: step }),

  prevStep: () =>
    set((state) => ({
      activeStep: Math.max(state.activeStep - 1, 0),
    })),

  nextStep: () =>
    set((state) => ({
      activeStep: Math.min(state.activeStep + 1, state.totalSteps - 1),
    })),

  skip: () => set((state) => ({ activeStep: state.totalSteps - 1 })),

  // ================= REQUEST PASSWORD RESET =================
  requestPassWordResetViaEmail: async (email) => {
    set({ loading: true });

    try {
      const response = await API.post("/user/request-reset-password", {
        email,
      });
      set({ cooldown: 0 });

      return response.data.message;
    } catch (error) {
      const message = error?.response?.data?.error || "Something went wrong.";
      const match = message.match(/wait (\d+) seconds/i);
      if (match) {
        set({ cooldown: Number(match[1]) });
      }
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  // ================= VERIFY OTP =================
  verifyPasswordResetCodeViaEmail: async (email, otp) => {
    set({ loading: true });
    try {
      const response = await API.post(
        "/user/verify-remail-reset-password-otp",
        { email, otp }
      );
      return response.data.message;
    } catch (error) {
      throw new Error(error?.response?.data?.error || "Something went wrong.");
    } finally {
      set({ loading: false });
    }
  },

  // ================= RESET PASSWORD =================
  resetPasswordViaEmail: async (email, otp, newPassword) => {
    set({ loading: true });
    try {
      const response = await API.post("/user/reset-password-via-email", {
        email,
        otp,
        newPassword,
      });
      return response.data.message;
    } catch (error) {
      throw new Error(error?.response?.data?.error || "Something went wrong.");
    } finally {
      set({ loading: false });
    }
  },

  // ================= COOLDOWN TICKER =================
  tickCooldown: () =>
    set((state) => ({
      cooldown: state.cooldown > 0 ? state.cooldown - 1 : 0,
    })),
}));

export default useForgotPasswordStore;
