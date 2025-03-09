import { atom, selector, selectorFamily } from "recoil";
import { rowItems, TreeItem } from "../data/initialContent";

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

export const isCreateFilePopupState = atom({
  key: "isCreateFilePopupState",
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

// Selector family to remove an item by ID
export const removeItemById = selectorFamily({
  key: "removeItemById",
  get:
    () =>
    ({ get }) => {
      // This is just for reading the current state
      return get(allDataState);
    },
  set:
    (itemId: number) =>
    ({ set }) => {
      set(allDataState, (prevItems) => {
        // Helper function to remove an item recursively
        const removeItem = (items: TreeItem[]): TreeItem[] => {
          // Filter out the item with the matching ID at current level
          const filteredItems = items.filter((item) => item.id !== itemId);

          // If we removed an item (length changed), return the filtered array
          if (filteredItems.length !== items.length) {
            return filteredItems;
          }

          // Otherwise, recursively check children of each item
          return filteredItems.map((item) => {
            if (item.children && item.children.length > 0) {
              return {
                ...item,
                children: removeItem(item.children),
              };
            }
            return item;
          });
        };

        // Apply the removal function to the root items
        return removeItem(prevItems);
      });
    },
});
