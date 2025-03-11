import documentsService from "@/api/services/documentsService";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import {
  EllipsisVertical,
  FilePlus,
  FolderPlus,
  LoaderCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { parseApiData } from "../data/initialContent";
import {
  allDataState,
  isCreateFilePopupState,
  isCreateFolderPopupState,
  isEditFolderPopupState,
  selectedFilesState,
  selectedItemIdState,
} from "../redux/atoms";

function ContentRowPopover({ id, type }: { id: number; type: string }) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const openCreateFolderPopup = useSetRecoilState(isCreateFolderPopupState);
  const openEditFolderPopup = useSetRecoilState(isEditFolderPopupState);
  const openCreateFilePopup = useSetRecoilState(isCreateFilePopupState);
  const setSelectedFilesState = useSetRecoilState(selectedFilesState);
  const setSelectedItemId = useSetRecoilState(selectedItemIdState);
  const [allFolderData, setAllFolderData] = useRecoilState(allDataState);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleDeleteFolder = async (id: number) => {
    setIsLoadingDelete(true);
    try {
      await documentsService.deleteDocument(id);

      const allDocuments = await documentsService.getAllDocuments();
      const parsedData = parseApiData(allDocuments.data, allFolderData);

      setAllFolderData(parsedData);
      setPopoverOpen(false);
      setSelectedFilesState([]);
    } catch (error) {
      console.log("Error: ", error);
    }
    setIsLoadingDelete(false);
  };

  return (
    <Popover
      open={popoverOpen}
      handler={() => {
        setPopoverOpen(!popoverOpen);
      }}
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
        {type === "folder" ? (
          <div
            onClick={() => {
              openEditFolderPopup(true);
              setPopoverOpen(false);
              setSelectedItemId(id);
            }}
            className="p-[12px] bg-white border-b border-b-gray-100 flex items-center gap-[8px] hover:bg-primary-100/80 cursor-pointer"
          >
            <Pencil className="w-[20px] h-[20px]" />
            <p>Edit</p>
          </div>
        ) : (
          <></>
        )}
        <button
          disabled={isLoadingDelete}
          onClick={() => handleDeleteFolder(id)}
          className="w-full p-[12px] bg-white border-b border-b-gray-100 flex items-center gap-[8px] hover:bg-primary-100/80 cursor-pointer focus:outline-0"
        >
          {isLoadingDelete ? <LoaderCircle className="animate-spin" /> : <></>}
          <div className="flex items-center gap-[8px]">
            <Trash2 className="w-[20px] h-[20px]" />
            <p>Delete</p>
          </div>
        </button>
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
