"use client";

import { File } from "lucide-react";

type FileUploadProgressProps = {
  fileName: string;
  progress: number;
};

function FileUploadProgress({ fileName, progress }: FileUploadProgressProps) {
  return (
    <div className="flex flex-col w-full bg-white my-[12px] p-4">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 flex items-center justify-center text-blue-500">
          <File className="w-full h-full" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">{fileName}</p>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-500">
            {progress.toFixed(0)}% upload completed
          </span>
        </div>
        <progress
          className="h-[12px] w-full rounded-full border border-gray-100 bg-gray-100/70"
          value={progress.toFixed(0)}
          max={100}
        ></progress>
      </div>
    </div>
  );
}

export default FileUploadProgress;
