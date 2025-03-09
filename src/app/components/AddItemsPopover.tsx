import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { Plus } from "lucide-react";
import { useRecoilState } from "recoil";
import { isCreateFolderPopupState } from "../redux/atoms";
import { useState } from "react";

function AddItemsPopover() {
  const [isPopover, setIsPopover] = useState(false);
  const [openCreateFolderModal, setOpenCreateFolderModal] = useRecoilState(
    isCreateFolderPopupState
  );

  const handleOpen = () => {
    setIsPopover(false);
    setOpenCreateFolderModal(!openCreateFolderModal);
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
        <PopoverContent className="shadow-2xl border border-gray-100 w-[150px] outline-0 rounded-[10px] overflow-hidden">
          <>
            <button
              onClick={handleOpen}
              className=" w-full p-[12px] hover:bg-primary-100/80 cursor-pointer text-left active:outline-0 focus:outline-0"
            >
              <p>Create Folder</p>
            </button>
            <button className="p-[12px] hover:bg-primary-100/80 cursor-pointer w-full text-left">
              <p>Upload File</p>
            </button>
          </>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default AddItemsPopover;
