"use client";

import { AlignJustify, ChevronLeft, File, Folder } from "lucide-react";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  findItemAndParents,
  toggleFolderExpanded,
} from "../data/initialContent";
import {
  allDataState,
  getAllFilesNumbers,
  getAllFoldersNumbers,
  iframePopupState,
  isLoadingFolderDataState,
  selectedFilesState,
  selectedItemIdState,
} from "../redux/atoms";
import FolderItem from "./FolderItem";

const items = [
  {
    id: 1,
    name: "Folders",
    number: 200,
    icon: <Folder className="w-full h-full" />,
  },
  {
    id: 2,
    name: "Documents",
    number: 200,
    icon: <File className="w-full h-full" />,
  },
];

function FolderSidebar() {
  const [expanded, setExpanded] = useState(true);
  const [rowItems, setRowItems] = useRecoilState(allDataState);
  const allTableData = useRecoilValue(allDataState);
  const setSelectedFiles = useSetRecoilState<string[]>(selectedFilesState);
  const folderCount = useRecoilValue(getAllFoldersNumbers);
  const fileCount = useRecoilValue(getAllFilesNumbers);
  const setSelectedItemId = useSetRecoilState(selectedItemIdState);
  const setIframePopupState = useSetRecoilState(iframePopupState);
  const isLoadingFolderData = useRecoilValue(isLoadingFolderDataState);

  const handleFolderSelect = (id: number, type: string) => {
    setSelectedFiles([]);
    setSelectedItemId(id);

    if (type === "file") {
      setIframePopupState(true);
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
          background: white;
        }
        ::-webkit-scrollbar-thumb {
          background: #e2ecf8;
          border-radius: 5px;
        }
      `}</style>
      <div
        className={`${
          expanded ? "min-w-[320px] bg-white" : "w-0"
        }   shadow-xl border-r border-r-gray-100 h-full relative transition-all duration-300 ease-in-out`}
      >
        <div className={`absolute -right-[14px] top-[22px]`}>
          <div
            onClick={() => setExpanded(!expanded)}
            className="h-[27px] w-[27px] bg-primary-150 hover:bg-primary-200 rounded-full shadow cursor-pointer"
          >
            {expanded ? (
              <ChevronLeft className="w-full h-full p-[4px]" />
            ) : (
              <AlignJustify className="w-full h-full p-[6px]" />
            )}
          </div>
        </div>
        <div className={`${expanded ? "visible" : "invisible"} h-full`}>
          <div className="px-[20px] py-[25px] select-none min-h-fit h-[18%]">
            <h1 className="text-[15px] font-semibold">Folders & Documents</h1>
            <div className="flex items-center gap-[12px] mt-[16px]">
              {items.map((item, index) => (
                <div className="flex items-center" key={index}>
                  <div>
                    <div className="w-[32px] mb-[8px]">{item.icon}</div>
                    <p className="text-[12px] font-[400]">{item.name}</p>
                    <p className="text-[20px] font-semibold">
                      {index === 0 ? folderCount : fileCount}+
                    </p>
                  </div>
                  {index === 0 ? (
                    <div className="h-[60px] bg-gray-100 w-[1px] mx-[18px]"></div>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
          <hr className="text-gray-100" />
          <div className={`p-[12px] m-[6px] overflow-y-auto h-[80%]`}>
            {allTableData && allTableData.length > 0 ? (
              allTableData.map((itemData, index) => (
                <FolderItem
                  key={index}
                  data={itemData}
                  selectedId={null} // You might want to use a state variable here
                  handleFolderSelect={handleFolderSelect}
                  level={0}
                />
              ))
            ) : isLoadingFolderData ? (
              <div className="space-y-[10px]">
                {Array.from({ length: 14 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[30px] rounded-[10px] shadow w-full bg-primary-200 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <p>No Data Found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FolderSidebar;
