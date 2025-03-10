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
import { useState } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import {
  isCreateFilePopupState,
  isCreateFolderPopupState,
  removeItemById,
  selectedFilesState,
  selectedItemIdState,
} from "../redux/atoms";

function ContentRowPopover({ id, type }: { id: number; type: string }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const openCreateFolderPopup = useSetRecoilState(isCreateFolderPopupState);
  const openCreateFilePopup = useSetRecoilState(isCreateFilePopupState);
  const setSelectedFilesState = useSetRecoilState(selectedFilesState);
  const handleDelete = useRecoilCallback(({ set }) => (id: number) => {
    set(removeItemById(id), []); // The second parameter should be an empty array instead of null
    setSelectedFilesState([]);
  });
  const setSelectedItemId = useSetRecoilState(selectedItemIdState);

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
      <PopoverContent
        placeholder="Folder Details"
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className="min-w-[150px] w-fit border border-gray-100 rounded-[10px] shadow outline-0 overflow-hidden p-0"
      >
        <div className="p-[12px] bg-white border-b border-b-gray-100 flex items-center gap-[8px] hover:bg-primary-100/80 cursor-pointer">
          <Pencil className="w-[20px] h-[20px]" />
          <p>Edit</p>
        </div>
        <div
          onClick={() => {
            handleDelete(id);
            setPopoverOpen(false);
          }}
          className="p-[12px] bg-white border-b border-b-gray-100 flex items-center gap-[8px] hover:bg-primary-100/80 cursor-pointer"
        >
          <Trash2 className="w-[20px] h-[20px]" />
          <p>Delete</p>
        </div>
        {type === "folder" ? (
          <div
            onClick={() => {
              openCreateFolderPopup(true);
              setPopoverOpen(false);
              setSelectedItemId(id);
            }}
            className="p-[12px] bg-white border-b border-b-gray-100 flex items-center gap-[8px] hover:bg-primary-100/80 cursor-pointer"
          >
            <FolderPlus className="w-[20px] h-[20px]" />
            <p>Create Folder</p>
          </div>
        ) : (
          <></>
        )}
        {type === "folder" ? (
          <div
            onClick={() => {
              setSelectedItemId(id);
              openCreateFilePopup(true);
              setPopoverOpen(false);
            }}
            className="p-[12px] bg-white border-b border-b-gray-100 flex items-center gap-[8px] hover:bg-primary-100/80 cursor-pointer"
          >
            <FilePlus className="w-[20px] h-[20px]" />
            <p>Upload Document</p>
          </div>
        ) : (
          <></>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default ContentRowPopover;
