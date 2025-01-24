import { create } from "zustand";
import navBarSlice, { INavBarSlice } from "./slices/navbar.slice";

type TStore = INavBarSlice;
const useStore = create<TStore>((...a) => ({
  ...navBarSlice(...a),
}));

export default useStore;
