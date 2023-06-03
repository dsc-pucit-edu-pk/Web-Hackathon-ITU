import { create } from "zustand";

const useAuthStore = create((set) => ({
    token: "",
    user: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
}));

export default useAuthStore;