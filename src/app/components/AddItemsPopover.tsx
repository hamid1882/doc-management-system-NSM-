import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isCreateFilePopupState,
  isCreateFolderPopupState,
  selectedItemIdState,
} from "../redux/atoms";

function AddItemsPopover() {
  const [isPopover, setIsPopover] = useState(false);
  const [openCreateFolderModal, setOpenCreateFolderModal] = useRecoilState(
    isCreateFolderPopupState
  );
  const [openCreateFileModel, setOpenCreateFileModal] = useRecoilState(
    isCreateFilePopupState
  );
  const setSelectedItemId = useSetRecoilState(selectedItemIdState);

  const handleOpen = () => {
    setIsPopover(false);
    setSelectedItemId(null);
    setOpenCreateFolderModal(!openCreateFolderModal);
  };

  const handleFileOpen = () => {
    setIsPopover(false);
    setSelectedItemId(null);
    setOpenCreateFileModal(!openCreateFileModel);
  };

  return (
    <>
      <Popover
        open={isPopover}
        handler={() => setIsPopover(!isPopover)}
        placement="bottom-start"
      >
        <PopoverHandler className="w-[35px] h-[35px] rounded-[10px] bg-primary-500 hover:bg-primary-500/80 flex items-center justify-center p-[8px] cursor-pointer relative text-white">
          <Plus className="w-full h-full text-white fill-white" />
        </PopoverHandler>
        <PopoverContent
          placeholder="Create Folder"
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
          className="shadow-2xl border border-gray-100 w-[150px] outline-0 rounded-[10px] overflow-hidden p-0"
        >
          <>
            <button
              onClick={handleOpen}
              className=" w-full p-[12px] hover:bg-primary-100/80 cursor-pointer text-left active:outline-0 focus:outline-0 border-b border-b-gray-100"
            >
              <p>Create Folder</p>
            </button>
            <button
              onClick={handleFileOpen}
              className="p-[12px] hover:bg-primary-100/80 cursor-pointer w-full text-left"
            >
              <p>Upload File</p>
            </button>
          </>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default AddItemsPopover;
