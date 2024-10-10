import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';
import { merge } from "lodash"; 

type StorageType = {
  token: string | null;
  user: string | null;
  blur: boolean;
  statesChange: {
    setBlur: (blur: boolean) => void;
    setUser: (user: string | null) => void;
    setToken: (token: string | null) => void;
  }
}

export const useStorage = create<StorageType>()(
  persist(
    (set, get) => ({
      token: get()?.token ,
      user: get()?.user,
      blur: get()?.blur ?? false,
      statesChange: get()?.statesChange ?? {
        setBlur: (blur: boolean) => set((state) => ({ ...state, blur })),
        setToken: (token: string | null) => set((state) => ({ ...state, token })),
        setUser: (user: string | null) => set((state) => ({ ...state, user })),
      }
    }),
    {
      name: 'app-hotelaria-storage',
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
      merge: (persistedState, currentState) => {
        return merge({}, persistedState, currentState);
      }
    }
  )
)