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
    name: "Project Documentation",
    description: "Main project documentation and resources",
    createdAt: new Date("2023-01-15T10:30:00.000Z").toISOString(),
    updatedAt: new Date("2023-06-22T14:45:00.000Z").toISOString(),
    expanded: false,
    children: [
      {
        id: 11,
        type: "folder",
        name: "Technical Specs",
        description: "Technical specifications and architecture documents",
        createdAt: new Date("2023-02-01T09:15:00.000Z").toISOString(),
        updatedAt: new Date("2023-07-10T16:20:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 111,
            type: "file",
            name: "Architecture.pdf",
            description: "System architecture overview",
            createdAt: new Date("2023-02-15T11:30:00.000Z").toISOString(),
            updatedAt: new Date("2023-08-05T13:45:00.000Z").toISOString(),
            expanded: false,
          },
          {
            id: 112,
            type: "file",
            name: "Database_Schema.pdf",
            description: "Database design documentation",
            createdAt: new Date("2023-03-01T14:20:00.000Z").toISOString(),
            updatedAt: new Date("2023-09-12T10:30:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
      {
        id: 12,
        type: "folder",
        name: "User Manuals",
        description: "End-user documentation",
        createdAt: new Date("2023-03-15T09:45:00.000Z").toISOString(),
        updatedAt: new Date("2023-10-05T15:20:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 121,
            type: "file",
            name: "Admin_Guide.pdf",
            description: "Administrator's manual",
            createdAt: new Date("2023-04-01T13:15:00.000Z").toISOString(),
            updatedAt: new Date("2023-11-20T11:40:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    type: "folder",
    name: "Human Resources",
    description: "HR related documents and policies",
    createdAt: new Date("2023-01-20T11:00:00.000Z").toISOString(),
    updatedAt: new Date("2023-12-15T14:30:00.000Z").toISOString(),
    expanded: false,
    children: [
      {
        id: 21,
        type: "folder",
        name: "Employee Handbooks",
        description: "Company policies and procedures",
        createdAt: new Date("2023-02-05T10:45:00.000Z").toISOString(),
        updatedAt: new Date("2023-12-01T16:15:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 211,
            type: "file",
            name: "Employee_Handbook_2025.pdf",
            description: "Latest employee handbook",
            createdAt: new Date("2023-02-20T13:30:00.000Z").toISOString(),
            updatedAt: new Date("2023-11-28T09:45:00.000Z").toISOString(),
            expanded: false,
          },
          {
            id: 212,
            type: "file",
            name: "Code_of_Conduct.pdf",
            description: "Company code of conduct",
            createdAt: new Date("2023-03-05T15:20:00.000Z").toISOString(),
            updatedAt: new Date("2023-11-15T14:20:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
      {
        id: 22,
        type: "folder",
        name: "Benefits",
        description: "Employee benefits information",
        createdAt: new Date("2023-03-20T09:30:00.000Z").toISOString(),
        updatedAt: new Date("2023-10-25T11:35:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 221,
            type: "file",
            name: "Healthcare_Plans.pdf",
            description: "Healthcare benefits overview",
            createdAt: new Date("2023-04-05T14:15:00.000Z").toISOString(),
            updatedAt: new Date("2023-10-10T15:50:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    type: "folder",
    name: "Financial Records",
    description: "Financial documents and reports",
    createdAt: new Date("2023-01-25T13:45:00.000Z").toISOString(),
    updatedAt: new Date("2023-09-28T10:25:00.000Z").toISOString(),
    expanded: false,
    children: [
      {
        id: 31,
        type: "folder",
        name: "2025 Reports",
        description: "Financial reports for 2025",
        createdAt: new Date("2023-02-10T11:20:00.000Z").toISOString(),
        updatedAt: new Date("2023-09-15T16:40:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 311,
            type: "file",
            name: "Q1_Report.xlsx",
            description: "Q1 2025 Financial Report",
            createdAt: new Date("2023-02-25T15:50:00.000Z").toISOString(),
            updatedAt: new Date("2023-09-01T13:15:00.000Z").toISOString(),
            expanded: false,
          },
          {
            id: 312,
            type: "file",
            name: "Q2_Report.xlsx",
            description: "Q2 2025 Financial Report",
            createdAt: new Date("2023-03-10T10:15:00.000Z").toISOString(),
            updatedAt: new Date("2023-08-20T11:30:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    type: "folder",
    name: "Marketing Materials",
    description: "Marketing campaigns and assets",
    createdAt: new Date("2023-01-30T16:20:00.000Z").toISOString(),
    updatedAt: new Date("2023-08-05T15:45:00.000Z").toISOString(),
    expanded: false,
    children: [
      {
        id: 41,
        type: "folder",
        name: "Campaign 2025",
        description: "2025 Marketing Campaign Materials",
        createdAt: new Date("2023-02-15T14:30:00.000Z").toISOString(),
        updatedAt: new Date("2023-07-22T10:20:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 411,
            type: "file",
            name: "Campaign_Strategy.pptx",
            description: "Marketing strategy presentation",
            createdAt: new Date("2023-03-01T11:45:00.000Z").toISOString(),
            updatedAt: new Date("2023-07-10T14:35:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    type: "folder",
    name: "Legal Documents",
    description: "Contracts and legal documentation",
    createdAt: new Date("2023-02-05T09:15:00.000Z").toISOString(),
    updatedAt: new Date("2023-06-28T16:50:00.000Z").toISOString(),
    expanded: false,
    children: [
      {
        id: 51,
        type: "folder",
        name: "Contracts",
        description: "Client and vendor contracts",
        createdAt: new Date("2023-02-20T15:40:00.000Z").toISOString(),
        updatedAt: new Date("2023-06-15T13:25:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 511,
            type: "file",
            name: "Service_Agreement.pdf",
            description: "Standard service agreement template",
            createdAt: new Date("2023-03-05T10:25:00.000Z").toISOString(),
            updatedAt: new Date("2023-06-01T11:40:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    type: "folder",
    name: "Research and Development",
    description: "R&D projects and findings",
    createdAt: new Date("2023-02-10T13:50:00.000Z").toISOString(),
    updatedAt: new Date("2023-05-22T15:15:00.000Z").toISOString(),
    expanded: false,
    children: [
      {
        id: 61,
        type: "folder",
        name: "Project Alpha",
        description: "Confidential R&D project",
        createdAt: new Date("2023-02-25T11:35:00.000Z").toISOString(),
        updatedAt: new Date("2023-05-10T10:30:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 611,
            type: "file",
            name: "Research_Findings.pdf",
            description: "Project research results",
            createdAt: new Date("2023-03-10T14:20:00.000Z").toISOString(),
            updatedAt: new Date("2023-05-01T14:45:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    type: "folder",
    name: "IT Infrastructure",
    description: "IT systems documentation",
    createdAt: new Date("2023-02-15T16:15:00.000Z").toISOString(),
    updatedAt: new Date("2023-04-28T11:20:00.000Z").toISOString(),
    expanded: false,
    children: [
      {
        id: 71,
        type: "folder",
        name: "Network Diagrams",
        description: "Network architecture documents",
        createdAt: new Date("2023-03-01T09:40:00.000Z").toISOString(),
        updatedAt: new Date("2023-04-15T15:35:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 711,
            type: "file",
            name: "Network_Topology.vsdx",
            description: "Network topology diagram",
            createdAt: new Date("2023-03-15T15:25:00.000Z").toISOString(),
            updatedAt: new Date("2023-04-01T10:50:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    type: "folder",
    name: "Customer Support",
    description: "Support documentation and guides",
    createdAt: new Date("2023-02-20T10:30:00.000Z").toISOString(),
    updatedAt: new Date("2023-03-28T14:15:00.000Z").toISOString(),
    expanded: false,
    children: [
      {
        id: 81,
        type: "folder",
        name: "User Guides",
        description: "Product user guides",
        createdAt: new Date("2023-03-05T13:45:00.000Z").toISOString(),
        updatedAt: new Date("2023-03-15T16:40:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 811,
            type: "file",
            name: "Troubleshooting_Guide.pdf",
            description: "Product troubleshooting steps",
            createdAt: new Date("2023-03-20T11:10:00.000Z").toISOString(),
            updatedAt: new Date("2023-03-01T13:25:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
    ],
  },
  {
    id: 9,
    type: "folder",
    name: "Quality Assurance",
    description: "QA testing documents",
    createdAt: new Date("2023-02-25T14:55:00.000Z").toISOString(),
    updatedAt: new Date("2023-02-15T11:30:00.000Z").toISOString(),
    expanded: false,
    children: [
      {
        id: 91,
        type: "folder",
        name: "Test Cases",
        description: "QA test cases and results",
        createdAt: new Date("2023-03-10T16:20:00.000Z").toISOString(),
        updatedAt: new Date("2023-02-01T15:45:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 911,
            type: "file",
            name: "Test_Plan.xlsx",
            description: "Detailed test plan",
            createdAt: new Date("2023-03-25T09:35:00.000Z").toISOString(),
            updatedAt: new Date("2023-01-20T10:15:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
    ],
  },
  {
    id: 10,
    type: "folder",
    name: "Operations",
    description: "Operational procedures and documents",
    createdAt: new Date("2023-03-01T11:40:00.000Z").toISOString(),
    updatedAt: new Date("2023-01-15T14:50:00.000Z").toISOString(),
    expanded: false,
    children: [
      {
        id: 101,
        type: "folder",
        name: "Standard Procedures",
        description: "Standard operating procedures",
        createdAt: new Date("2025-03-15T18:30:00.000Z").toISOString(),
        updatedAt: new Date("2025-03-15T18:30:00.000Z").toISOString(),
        expanded: false,
        children: [
          {
            id: 1011,
            type: "file",
            name: "Emergency_Procedures.pdf",
            description: "Emergency response procedures",
            createdAt: new Date("2025-03-15T18:30:00.000Z").toISOString(),
            updatedAt: new Date("2025-03-15T18:30:00.000Z").toISOString(),
            expanded: false,
          },
        ],
      },
    ],
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
