import { useRecoilState } from "recoil";
import { paginationDataState } from "../redux/atoms";
import { ArrowLeft, ArrowRight } from "lucide-react";

function Pagination() {
  const [paginationData, setPaginationData] =
    useRecoilState(paginationDataState);

  const handleStepClick = (page: number) => {
    setPaginationData((prev) => ({ ...prev, page: page }));
  };

  const handleLimitSelect = (limit: number) => {
    setPaginationData((prev) => ({ ...prev, limit }));
  };

  const handlePrevious = () => {
    if (paginationData.currentPage > 1) {
      setPaginationData((prev) => ({ ...prev, page: prev.currentPage - 1 }));
    }
  };

  const handleNext = () => {
    if (paginationData.currentPage < paginationData.totalPages) {
      setPaginationData((prev) => ({ ...prev, page: prev.currentPage + 1 }));
    }
  };

  return (
    <div className="flex justify-center items-center gap-[12px] border border-gray-100 mx-auto my-[16px] py-[8px] bg-white rounded-[10px]">
      <div className="flex items-center w-full">
        <div className="flex justify-center items-center gap-[8px] w-[90%]">
          <div
            onClick={handlePrevious}
            className={`flex items-center gap-[6px] mr-[12px] ${
              paginationData.currentPage <= 1
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <ArrowLeft className="w-[16px] h-[16px]" />
            <p className="text-[10px] uppercase mt-[2px]">Previous</p>
          </div>
          {paginationData && paginationData.totalPages ? (
            Array.from({ length: paginationData.totalPages }).map(
              (_, index) => (
                <p
                  onClick={() => handleStepClick(index + 1)}
                  className={`h-[38px] w-[38px] flex justify-center items-center rounded-[10px] cursor-pointer text-sm  ${
                    paginationData.currentPage === index + 1
                      ? "bg-primary-500 hover:bg-primary-500/90 text-white"
                      : "hover:bg-black/10"
                  }`}
                  key={index}
                >
                  {index + 1}
                </p>
              )
            )
          ) : (
            <></>
          )}
          <div
            onClick={handleNext}
            className={`flex items-center gap-[6px] ml-[12px] ${
              paginationData.currentPage >= paginationData.totalPages
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <p className="text-[10px] uppercase mt-[2px]">Next</p>
            <ArrowRight className="w-[16px] h-[16px]" />
          </div>
        </div>
        <div className="w-[10px]">
          <select
            value={paginationData.limit}
            onChange={(e) => handleLimitSelect(Number(e.target.value))}
            className="border border-gray-100"
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
