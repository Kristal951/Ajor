
import { create } from "zustand";

const useOnboardingStore = create((set) => ({
  activeStep: 0,
  totalSteps: 3,
  setActiveStep: (step) => set({ activeStep: step }),
  prevStep:()=>  set((state) => ({
      activeStep: Math.min(state.activeStep - 1, state.totalSteps + 1),
    })),
  nextStep: () =>
    set((state) => ({
      activeStep: Math.min(state.activeStep + 1, state.totalSteps - 1),
    })),
  skip: () => set((state) => ({ activeStep: state.totalSteps - 1 })),
}));

export default useOnboardingStore;
