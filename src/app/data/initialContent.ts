// Define the interface for folder/file items
export interface TreeItem {
  id: number;
  type: "folder" | "file";
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  expanded: boolean;
  children?: TreeItem[];
}

export const rowItems: TreeItem[] = [
  {
    id: 1,
    type: "folder",
    name: "Folder Name 1",
    description:
      "This file includes the most dangerous se.file includes the most dangerous se...",
    createdAt: "17/03/2025 23:30",
    updatedAt: "17/03/2025 23:30",
    expanded: false,
    children: [
      {
        id: 11,
        type: "folder",
        name: "Semi Folder Name 1",
        description:
          "This file includes the most dangerous se.file includes the most dangerous se...",
        createdAt: "17/03/2025 23:30",
        updatedAt: "17/03/2025 23:30",
        children: [
          {
            id: 111,
            type: "file",
            name: "Document 1.pdf",
            description: "PDF document with important information",
            createdAt: "18/03/2025 10:15",
            updatedAt: "18/03/2025 10:15",
            expanded: false,
          },
          {
            id: 112,
            type: "folder",
            name: "Deep Nested Folder",
            description: "This is a deeply nested folder for testing",
            createdAt: "18/03/2025 11:30",
            updatedAt: "18/03/2025 11:30",
            expanded: false,
            children: [
              {
                id: 1121,
                type: "file",
                name: "Very Deep File.txt",
                description: "A text file in a deeply nested folder",
                createdAt: "18/03/2025 12:45",
                updatedAt: "18/03/2025 12:45",
                expanded: false,
              },
            ],
          },
        ],
        expanded: false,
      },
      {
        id: 12,
        type: "file",
        name: "Document in Folder 1.docx",
        description: "Word document with project specifications",
        createdAt: "17/03/2025 23:45",
        updatedAt: "17/03/2025 23:45",
        expanded: false,
      },
    ],
  },
  {
    id: 2,
    type: "folder",
    name: "Folder Name 2",
    description:
      "This file includes the most dangerous se.file includes the most dangerous se...",
    createdAt: "17/03/2025 23:30",
    updatedAt: "17/03/2025 23:30",
    children: [
      {
        id: 21,
        type: "file",
        name: "Report.xlsx",
        description: "Excel spreadsheet with quarterly reports",
        createdAt: "18/03/2025 09:15",
        updatedAt: "18/03/2025 09:15",
        expanded: false,
      },
    ],
    expanded: false,
  },
  {
    id: 3,
    type: "folder",
    name: "Folder Name 3",
    description:
      "This file includes the most dangerous se.file includes the most dangerous se...",
    createdAt: "17/03/2025 23:30",
    updatedAt: "17/03/2025 23:30",
    children: [],
    expanded: false,
  },
];

// Helper function to toggle expanded state of a folder
export const toggleFolderExpanded = (
  items: TreeItem[],
  itemId: number
): TreeItem[] => {
  return items.map((item) => {
    if (item.id === itemId) {
      return { ...item, expanded: !item.expanded };
    }

    if (item.children && item.children.length > 0) {
      return {
        ...item,
        children: toggleFolderExpanded(item.children, itemId),
      };
    }

    return item;
  });
};

export const findItemAndParents = (
  items: TreeItem[],
  itemId: number,
  parentNames: string[] = []
): string[] => {
  for (const item of items) {
    // Create a new array with current path (don't modify the original parentNames)
    const currentPath = [...parentNames];

    // If current item is a folder and it's expanded, add it to the path
    if (item.type === "folder" && item.expanded) {
      currentPath.push(item.name);
    }

    // Check if this is the item we're looking for
    if (item.id === itemId) {
      // If it's a file, add its name to the path and return
      if (item.type === "file") {
        currentPath.push(item.name);
      }
      return currentPath;
    }

    // If this item has children, search recursively
    if (item.children && item.children.length > 0) {
      const result = findItemAndParents(item.children, itemId, currentPath);
      // If found in children, return the result
      if (result.length > 0) {
        return result;
      }
    }
  }

  // If we get here, the item wasn't found in this branch
  return [];
};

// export const findItemAndParents = (
//   items: TreeItem[],
//   itemId: number,
//   parentNames: string[] = []
// ): string[] => {
//   for (const item of items) {
//     // Create a new array with current path (don't modify the original parentNames)
//     const currentPath = [...parentNames];

//     // If current item is a folder, add it to the path
//     if (item.type === "folder") {
//       currentPath.push(item.name);
//     }

//     // Check if this is the item we're looking for
//     if (item.id === itemId) {
//       return currentPath;
//     }

//     // If this item has children, search recursively
//     if (item.children && item.children.length > 0) {
//       const result = findItemAndParents(item.children, itemId, currentPath);
//       // If found in children, return the result
//       if (result.length > 0) {
//         return result;
//       }
//     }
//   }

//   // If we get here, the item wasn't found in this branch
//   return [];
// };
