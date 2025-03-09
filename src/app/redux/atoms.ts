import { atom } from "recoil";
import { rowItems } from "../data/initialContent";

export const allDataState = atom({
  key: "allDataState",
  default: rowItems,
});

export const selectedFilesState = atom<string[]>({
  key: "selectedFilesState",
  default: [],
});

export const isCreateFolderPopupState = atom({
  key: "isCreateFolderPopupState",
  default: false,
});
