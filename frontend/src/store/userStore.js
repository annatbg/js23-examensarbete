// src/store/userStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUser = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (userData, userToken) =>
        set(() => ({ user: userData, token: userToken })),
      logout: () => set(() => ({ user: null, token: null })),
    }),
    {
      name: "zustand-user", // This will store the state in localStorage with this name
    }
  )
);

export default useUser;
