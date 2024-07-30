export interface IAppState {
  coins: number;
  energy: number;
  loadingUserData: boolean;
  level: number;
}

export interface IAppActions {
  coinIncrease: () => void;
  energyIncrease: () => void;
  setCoins: (payload: number) => void;
  setEnergy: (payload: number) => void;
  fetchUserData: (id: number) => void;
}

export type IAppStore = IAppState & IAppActions;

export interface ITouchEffect {
  value: number;
  icon: string;
  x: number;
  y: number;
}
