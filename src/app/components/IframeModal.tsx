"use client";

import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { iframePopupState, selectedItemIdState } from "../redux/atoms";
import documentsService from "@/api/services/documentsService";
import { X } from "lucide-react";
import Image from "next/image";

interface DocumentData {
  id: string;
  name: string;
  fileUrl: string;
  fileType: string;
  createdAt: string;
  updatedAt: string;
  size: number;
  description?: string;
}

function IframeModal() {
  const selectedItemId = useRecoilValue(selectedItemIdState);
  const [open, setOpen] = useRecoilState(iframePopupState);
  const [isLoadingFolderData, setIsLoadingFolderData] = useState(false);
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);

  const handleFetchById = async () => {
    if (!selectedItemId) {
      console.error("Item not selected");
      return;
    }
    setIsLoadingFolderData(true);

    try {
      const fetchedData = await documentsService.getById(selectedItemId);

      setDocumentData(fetchedData.data);
    } catch (error) {
      console.error("Error occured fetching the document", error);
    }

    setIsLoadingFolderData(false);
  };

  useEffect(() => {
    if (open) {
      handleFetchById();
    }
  }, [open]);

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
        } h-[500px]  w-[650px] bg-white rounded-[10px] shadow transition-all overflow-hidden`}
      >
        {!isLoadingFolderData && documentData ? (
          <div className="h-full w-full bg-white p-[12px] rounded-[10px] shadow space-y-[12px]">
            <div className="pb-[14px] border-b border-b-gray-100 flex justify-between gap-[12px]">
              <p className="font-semibold truncate">{documentData.name}</p>
              <X className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>
            <div className="pt-[8px] h-full w-full">
              {documentData.fileType?.includes("image/") ? (
                <Image
                  src={documentData.fileUrl}
                  alt={documentData.name}
                  className="h-[90%] w-full rounded-[10px] shadow object-contain"
                  width={500}
                  height={500}
                />
              ) : documentData.fileType?.includes("video/") ? (
                <video
                  src={documentData.fileUrl}
                  controls
                  className="h-[90%] w-full rounded-[10px] shadow"
                />
              ) : (
                <iframe
                  src={documentData.fileUrl}
                  title={documentData.name}
                  className="h-[90%] w-full rounded-[10px] shadow"
                  sandbox="allow-same-origin allow-scripts allow-popups"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-primary-200 animate-pulse"></div>
        )}
      </div>
    </div>
  );
}

export default IframeModal;
