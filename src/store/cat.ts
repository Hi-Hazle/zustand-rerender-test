import { create } from 'zustand';

interface BearStore {
  papaBear: string;
  mamaBear: string;
  littleBear: string;
}

interface BearStoreAction {
  setBearName: ({ key }: { key: 'papaBear' | 'mamaBear' | 'littleBear'; value: string }) => void;
  reset: () => void;
}

const initialBearStore: BearStore = {
  papaBear: '',
  mamaBear: '',
  littleBear: 't',
};

export const useBearStore = create<BearStore & BearStoreAction>((set) => ({
  ...initialBearStore,
  setBearName: ({ key, value }) => {
    set((state) => {
      return {
        ...state,
        [key]: value,
      };
    });
  },
  reset: () => {
    set(initialBearStore);
  },
}));
