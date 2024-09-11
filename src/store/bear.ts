import { create } from 'zustand';

interface CommonStore {
  papaBear: string;
  mamaBear: string;
  littleBear: string;
}

interface CommonStoreAction {
  setBearName: ({ key }: { key: 'papaBear' | 'mamaBear' | 'littleBear'; value: string }) => void;
  reset: () => void;
}

const initialCommonStore: CommonStore = {
  papaBear: '',
  mamaBear: '',
  littleBear: 't',
};

export const useCommonStore = create<CommonStore & CommonStoreAction>((set) => ({
  ...initialCommonStore,
  setBearName: ({ key, value }) => {
    set((state) => {
      return {
        ...state,
        [key]: value,
      };
    });
  },
  reset: () => {
    set(initialCommonStore);
  },
}));
