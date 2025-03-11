import documentsService from "@/api/services/documentsService";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import { Filter, LoaderCircle, X } from "lucide-react";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { parseApiData } from "../data/initialContent";
import { allDataState, paginationDataState } from "../redux/atoms";

function AddFiltersPopover() {
  const [allFolderData, setAllFolderData] = useRecoilState(allDataState);
  const [openPopover, setOpenPopover] = useState(false);
  const [filterInputData, setFilterInputData] = useState({
    name: "",
    description: "",
    date: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const setPaginationData = useSetRecoilState(paginationDataState);

  const handleFilterDocs = async () => {
    setIsLoading(true);
    try {
      const documentData = await documentsService.getAllDocumentsByFilter(
        filterInputData.name,
        filterInputData.description,
        filterInputData.date
      );
      const parsedData = parseApiData(documentData.data, allFolderData);
      setAllFolderData(parsedData);

      setPaginationData((prev) => ({
        ...prev,
        totalPages: documentData.totalPages,
        currentPage: documentData.currentPage,
        count: documentData.count,
      }));
    } catch (error) {
      console.error("Error occured", error);
    }
    setIsLoading(false);
  };

  const handleClearDocs = async () => {
    try {
      const documentData = await documentsService.getAllDocumentsByFilter(
        "",
        "",
        ""
      );
      const parsedData = parseApiData(documentData.data, allFolderData);
      setAllFolderData(parsedData);

      setPaginationData((prev) => ({
        ...prev,
        totalPages: documentData.totalPages,
        currentPage: documentData.currentPage,
        count: documentData.count,
      }));
    } catch (error) {
      console.error("Error occured", error);
    }
  };

  const handleClear = () => {
    setFilterInputData({
      name: "",
      description: "",
      date: "",
    });
    handleClearDocs();
  };

  const handleSubmitFilters = () => {
    handleFilterDocs();
  };

  return (
    <Popover
      open={openPopover}
      handler={setOpenPopover}
      placement="bottom-start"
    >
      <PopoverHandler className="w-[35px] h-[35px] rounded-[10px] bg-primary-500 hover:bg-primary-500/80 flex items-center justify-center p-[8px] cursor-pointer relative text-white">
        <Filter className="w-full h-full text-white fill-white" />
      </PopoverHandler>
      <PopoverContent
        placeholder="Filters"
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className="shadow-2xl border border-gray-100 w-[440px] outline-0 rounded-[10px] overflow-hidden p-0"
      >
        <>
          <div className="p-[12px] border-b border-b-gray-100 flex justify-between items-center">
            <p className="font-semibold text-[15px]">Filters</p>
            <div className="flex gap-[14px] items-center cursor-pointer">
              <p
                onClick={handleClear}
                className="font-semibold text-[15px] text-red-primary border-b border-b-red-primary"
              >
                Clear
              </p>
              <X
                onClick={() => setOpenPopover(false)}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="p-[16px] space-y-[12px]">
            <div className="flex flex-col gap-[6px]">
              <label>Name</label>
              <input
                name="name"
                value={filterInputData["name"]}
                onChange={handleFilterInputChange}
                type="text"
                placeholder="Folder name"
                className="w-full rounded-[10px] border border-gray-100 p-[12px] focus:outline-0"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label>Description</label>
              <input
                type="text"
                placeholder="Folder Description"
                className="w-full rounded-[10px] border border-gray-100 p-[12px] focus:outline-0"
                name="description"
                value={filterInputData["description"]}
                onChange={handleFilterInputChange}
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label>Date</label>
              <input
                type="date"
                placeholder="Select Date"
                className="w-full rounded-[10px] border border-gray-100 p-[12px] focus:outline-0"
                name="date"
                value={filterInputData["date"]}
                onChange={handleFilterInputChange}
              />
            </div>
          </div>
          <div className="p-[12px] border-t border-t-gray-100 flex justify-end items-center gap-[10px]">
            <button
              onClick={() => setOpenPopover(false)}
              className="w-[120px] p-[12px] rounded-[10px] border border-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleSubmitFilters}
              className="w-[120px] bg-primary-500 hover:bg-primary-500/80 p-[12px] rounded-[10px] text-white cursor-pointer flex items-center justify-center gap-[8px]"
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : <></>}
              Apply
            </button>
          </div>
        </>
      </PopoverContent>
    </Popover>
  );
}

export default AddFiltersPopover;
