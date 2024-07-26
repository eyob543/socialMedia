import { create } from "zustand";
export const useUserStore = create((set) => ({
  userName: "",
  isLoggedIn: false,
  setIsLoggedIn: (val) => set({ isLoggedIn: val }),
  setUserName: (name) => set({ userName: name }),
}));
export const useUserName = () => useUserStore((state) => state.userName);
export const useLoggedInfo = () => useUserStore((state) => state.isLoggedIn);
