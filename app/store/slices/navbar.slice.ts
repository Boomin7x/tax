import { StateCreator } from "zustand";

export interface INavBarSlice {
  title?: string;
  handleTitle: (newTitle: string) => void;
}
const navBarSlice: StateCreator<INavBarSlice> = (set) => ({
  title: undefined,
  handleTitle: (nt) => set((state) => ({ ...state, title: nt })),
});

export default navBarSlice;
