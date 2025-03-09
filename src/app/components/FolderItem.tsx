import { File, Folder, Plus } from "lucide-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isCreateFolderPopupState, selectedFilesState } from "../redux/atoms";

function FolderItem({
  id,
  name,
  type,
  handleFolderSelect,
}: {
  id: number;
  name: string;
  type: string;
  handleFolderSelect: (id: number) => void;
}) {
  const selectedFilesArr = useRecoilValue(selectedFilesState);
  const setAddFolderPopup = useSetRecoilState(isCreateFolderPopupState);

  return (
    <div
      onClick={() => handleFolderSelect(id)}
      className={`flex justify-between p-[12px] border-b border-b-gray-100 cursor-pointer ${
        selectedFilesArr &&
        selectedFilesArr[selectedFilesArr.length - 1] === name
          ? "bg-primary-200/50 hover:bg-primary-200/30"
          : "hover:bg-primary-150"
      }`}
    >
      <div className="flex items-center gap-[8px]">
        {type === "folder" ? (
          <Folder className="w-[17px] h-[17px]" />
        ) : (
          <File className="w-[17px] h-[17px]" />
        )}
        <p className="text-[13px] font-[400]">{name}</p>
      </div>
      <div
        onClick={() => setAddFolderPopup(true)}
        className="w-[20px] h-[20px] rounded-full bg-primary-200 hover:bg-secondary-500 hover:text-white"
      >
        <Plus className="w-full h-full font-thin text-[8px] p-[2px]" />
      </div>
    </div>
  );
}

export default FolderItem;
