import { TreeItem } from "../data/initialContent";
import MainContentRow from "./MainContentRow";

interface FolderTreeProps {
  data: TreeItem;
  selectedId: number | null;
  handleFolderSelect: (id: number, type: string) => void;
  level?: number;
}

const FolderTree = ({
  data,
  selectedId,
  handleFolderSelect,
  level = 0,
}: FolderTreeProps) => {
  return (
    <div className="flex flex-col gap-[6px] w-full">
      <MainContentRow
        id={data.id}
        name={data.name}
        type={data.type}
        description={data.description}
        createdAt={data.createdAt}
        updatedAt={data.updatedAt}
        expanded={data.expanded}
        handleFolderSelect={handleFolderSelect}
        childrenLength={data?.children?.length}
        level={level}
      />

      {/* Recursively render children when expanded */}
      {data.expanded && data.children && data.children.length > 0 && (
        <div className={`ml-8 w-full`}>
          {data.children.map((child, index) => (
            <FolderTree
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
};

export default FolderTree;
