"use client";

import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  findItemAndParents,
  toggleFolderExpanded,
} from "../data/initialContent";
import {
  allDataState,
  selectedFilesState,
  selectedItemIdState,
} from "../redux/atoms";
import FolderTree from "./FolderTree";

function MainContent() {
  const [rowItems, setRowItems] = useRecoilState(allDataState);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const setSelectedFiles = useSetRecoilState<string[]>(selectedFilesState);
  const setSelectedItemId = useSetRecoilState(selectedItemIdState);

  const handleFolderSelect = (id: number, type: string) => {
    setSelectedFiles([]);
    setSelectedId(id);

    if (type === "folder") {
      setSelectedItemId(id);
    }

    const updatedItems = toggleFolderExpanded(rowItems, id);
    setRowItems(updatedItems);

    const folderNames = findItemAndParents(updatedItems, id);
    setSelectedFiles(folderNames);
  };

  return (
    <>
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #a9b5df;
          border-radius: 5px;
        }
      `}</style>
      <div
        style={{ height: "calc(100% - 70px)" }}
        className="py-[26px] my-[12px] mr-[6px] px-[16px] overflow-auto"
      >
        <table
          style={{ borderSpacing: "0 10px" }}
          className="w-full  border-separate"
        >
          <thead>
            <tr>
              <th className="px-4 py-2 w-[20%]">Name</th>
              <th className="px-4 py-2 w-[30%]">Description</th>
              <th className="px-4 py-2 w-[20%]">Created At</th>
              <th className="px-4 py-2 w-[20%]">Updated At</th>
              <th className="px-4 py-2 w-[10%]"></th>
            </tr>
          </thead>
          <tbody className="space-y-[10px]">
            {rowItems.map((data, index) => (
              <tr
                key={index}
                className={`h-fit
                   bg-white shadow border-spacing-[10px] overflow-hidden my-[10px] cursor-pointer transition-all`}
              >
                <td
                  colSpan={5}
                  className="rounded-[10px] shadow overflow-hidden w-full border border-gray-100"
                >
                  <FolderTree
                    data={data}
                    selectedId={selectedId}
                    handleFolderSelect={handleFolderSelect}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MainContent;
