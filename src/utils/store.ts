import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { IAppState, IAppStore } from "./types";
import { appAxios } from "./axios";

const initialState: IAppState = {
  coins: 0,
  energy: 0,
  loadingUserData: false,
  level: 1,
};

export const useStore = create<IAppStore>()(
  devtools(
    immer((set) => ({
      ...initialState,
      coinIncrease() {
        set((state) => {
          if (
            state.level < 8 &&
            state.coins + 1 >
              state.level * 100_000
          ) {
            state.level = state.level + 1;
          }
          state.coins = state.coins + 1;
        });
      },
      energyIncrease() {
        set((state) => {
          if (
            state.energy <
            import.meta.env.VITE_APP_MAX_ENERGY
          ) {
            state.energy = state.energy + 1;
          }
        });
      },
      setCoins(payload) {
        set((state) => {
          if (
            state.level < 8 &&
            payload > state.level * 100_000
          ) {
            state.level = state.level + 1;
          }
          state.coins = payload;
        });
      },
      setEnergy(payload) {
        set((state) => {
          state.energy = payload;
        });
      },
      fetchUserData(id) {
        set((state) => {
          state.loadingUserData = true;
        });
        appAxios
          .get<
            Pick<IAppState, "coins" | "energy">
          >(`/user_entry_check/${id}`)
          .then(({ data }) => {
            if (
              data &&
              typeof data.coins === "number" &&
              typeof data.energy === "number"
            ) {
              set((state) => {
                state.coins = data.coins;
                state.energy = data.energy;
                const maxLevel = Math.round(
                  data.coins / 100_000
                );
                state.level =
                  maxLevel > 9 ? 9 : maxLevel;
              });
            }
          })
          .finally(() => {
            set((state) => {
              state.loadingUserData = false;
            });
          });
      },
    }))
  )
);
