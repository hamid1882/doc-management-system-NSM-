import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import {
  EllipsisVertical,
  FilePlus,
  FolderPlus,
  Pencil,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { isCreateFolderPopupState } from "../redux/atoms";

function ContentRowPopover() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const openCreateFolderPopup = useSetRecoilState(isCreateFolderPopupState);

  return (
    <Popover
      open={popoverOpen}
      handler={() => setPopoverOpen(!popoverOpen)}
      placement="bottom-end"
    >
      <PopoverHandler>
        <div className="w-full flex justify-center items-center">
          <EllipsisVertical className="cursor-pointer mr-[10px]" />
        </div>
      </PopoverHandler>
      <PopoverContent className="min-w-[150px] w-fit border border-gray-100 rounded-[10px] shadow outline-0 overflow-hidden">
        <div className="p-[12px] bg-white border-b border-b-gray-100 flex items-center gap-[8px] hover:bg-primary-100/80 cursor-pointer">
          <Pencil className="w-[20px] h-[20px]" />
          <p>Edit</p>
        </div>
        <div className="p-[12px] bg-white border-b border-b-gray-100 flex items-center gap-[8px] hover:bg-primary-100/80 cursor-pointer">
          <Trash2 className="w-[20px] h-[20px]" />
          <p>Delete</p>
        </div>
        <div
          onClick={() => openCreateFolderPopup(true)}
          className="p-[12px] bg-white border-b border-b-gray-100 flex items-center gap-[8px] hover:bg-primary-100/80 cursor-pointer"
        >
          <FolderPlus className="w-[20px] h-[20px]" />
          <p>Create Folder</p>
        </div>
        <div className="p-[12px] bg-white border-b border-b-gray-100 flex items-center gap-[8px] hover:bg-primary-100/80 cursor-pointer">
          <FilePlus className="w-[20px] h-[20px]" />
          <p>Upload Document</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ContentRowPopover;
