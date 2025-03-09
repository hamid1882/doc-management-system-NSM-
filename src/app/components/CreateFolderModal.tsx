"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TreeItem } from "../data/initialContent";
import { allDataState, isCreateFolderPopupState } from "../redux/atoms";

function CreateFolderModal() {
  const [open, setOpen] = useRecoilState(isCreateFolderPopupState);
  const uniqueId = Date.now() + Math.floor(Math.random() * 1000);

  const [inputData, setInputData] = useState<TreeItem>({
    name: "",
    description: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expanded: false,
    children: [],
    type: "folder" as const,
    id: uniqueId,
  });

  const setAllFolderData = useSetRecoilState(allDataState);

  const handleInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!inputData.name || !inputData.description) {
      window.alert("Please fill all the inputs");
    }

    setAllFolderData((prev) => [inputData, ...prev]);
    setOpen(false);
  };

  return (
    <div
      className={`absolute top-0 ${
        open ? "!h-screen !w-screen" : "h-0 w-0"
      }  bg-black/50 transition-all duration-300 ease-in-out flex justify-center items-center`}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          open ? "" : "hidden"
        } w-[450px] bg-white rounded-[10px] shadow transition-all`}
      >
        <div className="flex items-center justify-between p-[12px] border-b border-b-gray-100">
          <p className="font-semibold">Create Folder</p>
          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        </div>
        <div className="p-[16px] space-y-[12px]">
          <div className="flex flex-col gap-[6px]">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={inputData["name"]}
              onChange={handleInputData}
              placeholder="Folder name"
              className="w-full rounded-[10px] border border-gray-100 p-[12px] focus:outline-0"
            />
          </div>
          <div className="flex flex-col gap-[6px]">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={inputData["description"]}
              onChange={handleInputData}
              placeholder="Folder Description"
              className="w-full rounded-[10px] border border-gray-100 p-[12px] focus:outline-0"
            />
          </div>
        </div>
        <div className="p-[12px] border-t border-t-gray-100 flex justify-end items-center gap-[10px]">
          <button
            onClick={() => setOpen(false)}
            className="w-[120px] p-[12px] rounded-[10px] border border-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-[120px] bg-primary-500 hover:bg-primary-500/80 p-[12px] rounded-[10px] text-white cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFolderModal;
