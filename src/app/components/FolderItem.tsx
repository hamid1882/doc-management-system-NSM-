import { ChevronRight, Eye, File, Folder, Plus } from "lucide-react";
import { useSetRecoilState } from "recoil";
import { TreeItem } from "../data/initialContent";
import { isCreateFolderPopupState } from "../redux/atoms";

interface FolderItemProps {
  data: TreeItem;
  selectedId: number | null;
  handleFolderSelect: (id: number, type: string) => void;
  level?: number;
}

function FolderItem({
  data,
  selectedId,
  handleFolderSelect,
  level = 0,
}: FolderItemProps) {
  const setAddFolderPopup = useSetRecoilState(isCreateFolderPopupState);

  return (
    <div className="flex flex-col gap-[6px] w-full">
      <div
        onClick={() => handleFolderSelect(data.id, data.type)}
        className={`flex justify-between p-[12px] border-b border-b-gray-100 cursor-pointer relative ${
          selectedId === data.id
            ? "bg-primary-200/50 hover:bg-primary-200/30"
            : "hover:bg-primary-150"
        }`}
      >
        <div className="flex items-center gap-[8px] w-[88%] overflow-hidden ">
          {/* Add left padding based on level */}
          <div
            style={{ paddingLeft: `${level * 10}px` }}
            className="flex items-center gap-[8px] w-full"
          >
            {data.type === "folder" && (
              <ChevronRight
                className={`${
                  data.expanded ? "rotate-90" : ""
                } transition-all z-10`}
                size={16}
              />
            )}
            {data.type === "folder" ? (
              <Folder className="w-[17px] h-[17px] z-10" />
            ) : (
              <File className="w-[22px] h-[22px] z-10" />
            )}
            <p className="text-[13px] font-[400] truncate">{data.name}</p>
          </div>
        </div>
        {data.type === "folder" ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setAddFolderPopup(true);
            }}
            className="w-[20px] h-[20px] rounded-full bg-primary-200/70 hover:bg-secondary-500 hover:text-white flex items-center justify-center"
          >
            <Plus className="w-full h-full font-thin text-[8px] p-[2px]" />
          </div>
        ) : (
          <Eye className="w-[20px] h-[20px] rounded-full text-primary-500" />
        )}
      </div>

      {/* Recursively render children when expanded */}
      {data.expanded && data.children && data.children.length > 0 && (
        <div className="w-full">
          {data.children.map((child, index) => (
            <FolderItem
              key={`${data.id}-${index}`}
              data={child}
              selectedId={selectedId}
              handleFolderSelect={handleFolderSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FolderItem;
