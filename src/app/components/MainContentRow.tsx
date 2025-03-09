import { ChevronRight, File, Folder } from "lucide-react";
import { useRecoilValue } from "recoil";
import { selectedFilesState } from "../redux/atoms";
import ContentRowPopover from "./ContentRowPopover";

type MainContentRowTypes = {
  name: string;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  expanded: boolean;
  id: number;
  handleFolderSelect: (id: number) => void;
  childrenLength: undefined | number;
  level: number;
};

function MainContentRow({
  name,
  type,
  description,
  createdAt,
  updatedAt,
  expanded,
  id,
  handleFolderSelect,
  childrenLength,
  level,
}: MainContentRowTypes) {
  const selectedFilesArr = useRecoilValue(selectedFilesState);

  return (
    <div
      onClick={() => handleFolderSelect(id)}
      onDoubleClick={() => handleFolderSelect(id)}
      style={{ width: `calc(100% - ${level * 24}px)` }}
      className={`flex justify-between gap-[16px]  transition-all h-[60px] items-center border-b border-gray-100  ${
        selectedFilesArr &&
        selectedFilesArr[selectedFilesArr.length - 1] === name
          ? "bg-primary-200/50 hover:bg-primary-200/30"
          : "hover:bg-primary-150"
      }`}
    >
      {/* name */}
      <div className="flex items-center gap-[8px] w-[20%]">
        <ChevronRight
          className={`${expanded && type === "folder" ? "w-[30px]" : "w-0"} ${
            expanded ? "rotate-90" : ""
          } transition-all fill-black`}
        />
        <div className="flex items-center gap-[18px]">
          <div className="w-[25px] h-[25px] relative select-none">
            {type === "folder" ? (
              <Folder className="w-full h-full" />
            ) : (
              <File className="w-full h-full" />
            )}
            {childrenLength && type === "folder" ? (
              <p className="absolute -top-[12px] -left-[4px] bg-secondary-500 rounded-full h-[16px] min-w-[16px] flex justify-center items-center font-bold w-fit text-[8px]">
                {childrenLength > 0 ? childrenLength : 0}
              </p>
            ) : (
              <></>
            )}
          </div>
          <p className="text-[14px] font-medium">{name}</p>
        </div>
      </div>
      {/* description */}
      <p className="truncate w-[30%] text-left">{description}</p>
      {/* created at */}
      <p className="w-[20%] text-center truncate">
        {createdAt}
        <span className="font-semibold mx-[8px]">23:30</span>
      </p>
      {/* updated at */}
      <p className="w-[20%] text-center truncate">
        {updatedAt}
        <span className="font-semibold mx-[8px]">23:30</span>
      </p>
      {/* action */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[10%] flex justify-center items-center"
      >
        <ContentRowPopover />
      </div>
    </div>
  );
}

export default MainContentRow;
