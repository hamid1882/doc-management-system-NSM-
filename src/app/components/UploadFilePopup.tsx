"use client";

import documentsService from "@/api/services/documentsService";
import { FileUp, LoaderCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { parseApiData, TreeItem } from "../data/initialContent";
import {
  allDataState,
  isCreateFilePopupState,
  selectedItemIdState,
  toastDataState,
} from "../redux/atoms";
import FileUploadProgress from "./FileUploadProgress";

interface FileMetadata {
  fileUrl: string;
  fileSize: number;
  fileType: string;
}

function UploadFilePopup() {
  const [open, setOpen] = useRecoilState(isCreateFilePopupState);
  const [progress, setProgress] = useState(0);
  const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
  const [file, setFile] = useState<FileMetadata | null>(null);
  const selectedItemId = useRecoilValue(selectedItemIdState);
  const [inputData, setInputData] = useState<TreeItem>({
    name: "",
    description: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expanded: false,
    children: [],
    type: "file" as const,
    id: uniqueId,
  });
  const [allFolderData, setAllFolderData] = useRecoilState(allDataState);
  const [isLoading, setIsLoading] = useState(false);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);
  const setToastData = useSetRecoilState(toastDataState);

  const handleFileUpload = async (file: File) => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    setIsDocumentUploaded(true);
    setInputData((prev) => ({ ...prev, name: file.name }));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const fileMetaData = await documentsService.uploadFile(
        formData,
        (percentCompleted: number) => {
          // Update progress state with the percentage from axios
          setProgress(percentCompleted);
        }
      );

      setFile(fileMetaData.data);

      setInputData((prev) => ({
        ...prev,
        name: file.name,
        description: "",
        ...fileMetaData.data,
      }));
    } catch (error: unknown) {
      console.log(error);
      setFile(null);
      setIsDocumentUploaded(false);
      setToastData({
        trigger: true,
        isError: true,
        message: `Error: ${error}`,
      });
    }
  };

  const handleUploadFile = async () => {
    setIsLoading(true);

    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      await documentsService.createFileDocument({
        name: inputData.name,
        description: "",
        type: "file",
        fileUrl: file.fileUrl,
        fileSize: file.fileSize,
        fileType: file.fileType,
        parentId: selectedItemId ? selectedItemId : null,
      });

      const getAllDocuments = await documentsService.getAllDocuments();

      const parsedData = parseApiData(getAllDocuments.data, allFolderData);

      setAllFolderData(parsedData);

      setFile(null);
      setOpen(false);
      setIsDocumentUploaded(false);
      setToastData({
        trigger: true,
        isError: false,
        message: `Success: File Created`,
      });
    } catch (error: unknown) {
      console.log(error);
      setIsDocumentUploaded(false);
      setFile(null);
      setToastData({
        trigger: false,
        isError: false,
        message: `Error: ${error}`,
      });
    }

    setIsLoading(false);
  };

  const handleSubmit = () => {
    if (!inputData.name) {
      setToastData({
        trigger: true,
        isError: true,
        message: `Error: Please Upload the File`,
      });
      return;
    }

    handleUploadFile();
  };

  useEffect(() => {
    if (!isDocumentUploaded) {
      setProgress(0);
    }
  }, [isDocumentUploaded]);

  useEffect(() => {
    setIsDocumentUploaded(false);
  }, []);

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
        {!isDocumentUploaded ? (
          <div className="p-[16px] space-y-[12px]">
            <div className="flex flex-col gap-[6px]">
              <label>Browse document</label>
              <div className="relative w-full h-[120px] rounded-[10px] border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                <input
                  type="file"
                  name="file"
                  id="file-upload"
                  accept=".txt,.jpg,.jpeg,.gif,.png,.webp,.svg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-[50px] h-[50px]  flex items-center justify-center">
                    <FileUp className="w-full h-full text-gray-100" />
                  </div>
                </div>
              </div>
              <p className="text-[14px]">
                Supported: .txt .jpg .jpeg .gif .png .webp .svg
              </p>
            </div>
          </div>
        ) : (
          <FileUploadProgress fileName={inputData.name} progress={progress} />
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
            disabled={isLoading && !file}
            onClick={handleSubmit}
            className="w-[120px] bg-primary-500 hover:bg-primary-500/80 p-[12px] rounded-[10px] text-white cursor-pointer flex items-center justify-center gap-[8px]"
          >
            {isLoading ? <LoaderCircle className="animate-spin" /> : <></>}
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadFilePopup;
