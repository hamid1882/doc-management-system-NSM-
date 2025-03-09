"use client";

import { FileUp, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { TreeItem } from "../data/initialContent";
import { allDataState, isCreateFilePopupState } from "../redux/atoms";
import FileUploadProgress from "./FileUploadProgress";

function UploadFilePopup() {
  const [open, setOpen] = useRecoilState(isCreateFilePopupState);
  const [progress, setProgress] = useState(0);
  const id = uuidv4();
  const [file, setFile] = useState<File | null>(null);
  const [inputData, setInputData] = useState<TreeItem>({
    name: "",
    description: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expanded: false,
    children: [],
    type: "file" as const,
    id: Number(id),
  });

  const setAllFolderData = useSetRecoilState(allDataState);

  const handleSubmit = () => {
    if (!inputData.name || !inputData.description) {
      window.alert("Please fill all the inputs");
    }

    setAllFolderData((prev) => [inputData, ...prev]);
    setOpen(false);
    setFile(null);
  };

  useEffect(() => {
    if (file) {
      // Reset progress when a new file is selected
      setProgress(0);

      // Simulate upload progress from 0 to 100 over 2 seconds
      const duration = 1500; // 2 seconds in milliseconds
      const steps = 15; // Number of progress updates
      const interval = duration / steps;

      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + 100 / steps;

          // Clear interval when progress reaches 100
          if (nextProgress >= 100) {
            clearInterval(timer);
            return 100;
          }

          return nextProgress;
        });
      }, interval);

      // Clean up interval on component unmount or when file changes
      return () => clearInterval(timer);
    }
  }, [file]);

  return (
    <div
      className={`absolute top-0 ${
        open ? "!h-screen !w-screen" : "h-0 w-0"
      }  bg-black/50 transition-all duration-300 ease-in-out flex justify-center items-center`}
      onClick={() => {
        setOpen(false);
        setFile(null);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          open ? "" : "hidden"
        } w-[450px] bg-white rounded-[10px] shadow transition-all`}
      >
        <div className="flex items-center justify-between p-[12px] border-b border-b-gray-100">
          <p className="font-semibold">Upload Document</p>
          <X
            onClick={() => {
              setOpen(false);
              setFile(null);
            }}
            className="cursor-pointer"
          />
        </div>
        {!file ? (
          <div className="p-[16px] space-y-[12px]">
            <div className="flex flex-col gap-[6px]">
              <label>Browse document</label>
              <div className="relative w-full h-[120px] rounded-[10px] border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                <input
                  type="file"
                  name="file"
                  id="file-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setInputData((prev) => ({
                        ...prev,
                        name: e.target.files?.[0].name || "",
                        description: e.target.files?.[0].name || "",
                      }));
                      setFile(e.target.files[0]);
                    }
                  }}
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-[50px] h-[50px]  flex items-center justify-center">
                    <FileUp className="w-full h-full text-gray-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <FileUploadProgress
            fileName={inputData.name}
            fileSize={file.size}
            progress={progress}
          />
        )}
        <div className="p-[12px] border-t border-t-gray-100 flex justify-end items-center gap-[10px]">
          <button
            onClick={() => {
              setOpen(false);
              setFile(null);
            }}
            className="w-[120px] p-[12px] rounded-[10px] border border-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-[120px] bg-primary-500 hover:bg-primary-500/80 p-[12px] rounded-[10px] text-white cursor-pointer"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadFilePopup;
