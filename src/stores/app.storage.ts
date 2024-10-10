import { create, createStore } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

type StorageType = {
  token: string | null;
  user: string | null;
  statesChange: {
    setUser: (user: string | null) => void;
    setToken: (token: string | null) => void;
  }
}

export const useStorage = create<StorageType>()(
  persist(
    (set, get) => ({
      token: get()?.token ,
      user: get()?.user,
      statesChange: {
        setToken: (token: string | null) => set((state) => ({ ...state, token })),
        setUser: (user: string | null) => set((state) => ({ ...state, user })),
      }
    }),
    {
      name: 'app-hotelaria-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)