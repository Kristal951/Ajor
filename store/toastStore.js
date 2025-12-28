// store/useToast.js
import { create } from "zustand";

const useToastStore = create((set) => ({
  toast: null,
  showToast: (toast) => set({ toast }),
  hideToast: () => set({ toast: null }),
}));

export default useToastStore;
