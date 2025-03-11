import { atom, selector } from "recoil";
import { TreeItem } from "../data/initialContent";

export const allDataState = atom<TreeItem[]>({
  key: "allDataState",
  default: [],
});

export const paginationDataState = atom({
  key: "paginationDataState",
  default: {
    page: 1,
    limit: 10,
    currentPage: 1,
    count: 0,
    totalPages: 1,
  },
});

export const selectedFilesState = atom<string[]>({
  key: "selectedFilesState",
  default: [],
});

export const isCreateFolderPopupState = atom({
  key: "isCreateFolderPopupState",
  default: false,
});

export const isEditFolderPopupState = atom({
  key: "isEditFolderPopupState",
  default: false,
});

export const isCreateFilePopupState = atom({
  key: "isCreateFilePopupState",
  default: false,
});

export const iframePopupState = atom({
  key: "iframePopupState",
  default: false,
});

export const isLoadingFolderDataState = atom({
  key: "isLoadingFolderDataState",
  default: false,
});

// Selector to count all folders in the data structure
export const getAllFoldersNumbers = selector({
  key: "getAllFoldersNumbers",
  get: ({ get }) => {
    const data = get(allDataState);

    // Helper function to count folders recursively
    const countFolders = (items: TreeItem[]) => {
      let count = 0;

      for (const item of items) {
        if (item.type === "folder") {
          count++; // Count this folder

          // If this folder has children, count folders in children
          if (item.children && item.children.length > 0) {
            count += countFolders(item.children);
          }
        }
      }

      return count;
    };

    return countFolders(data);
  },
});

// Selector to count all files in the data structure
export const getAllFilesNumbers = selector({
  key: "getAllFilesNumbers",
  get: ({ get }) => {
    const data = get(allDataState);

    // Helper function to count files recursively
    const countFiles = (items: TreeItem[]) => {
      let count = 0;

      for (const item of items) {
        if (item.type === "file") {
          count++; // Count this file
        }

        // If this item has children (it's a folder), count files in children
        if (item.children && item.children.length > 0) {
          count += countFiles(item.children);
        }
      }

      return count;
    };

    return countFiles(data);
  },
});

export const selectedItemIdState = atom<number | null>({
  key: "selectedItemIdState",
  default: null,
});

export const toastDataState = atom({
  key: "toastDataState",
  default: {
    trigger: false,
    isError: false,
    message: "",
  },
});
