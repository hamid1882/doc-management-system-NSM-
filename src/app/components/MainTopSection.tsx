"use client";
import { ChevronRight } from "lucide-react";
import React from "react";
import { useRecoilValue } from "recoil";
import { selectedFilesState } from "../redux/atoms";
import AddFiltersPopover from "./AddFiltersPopover";
import AddItemsPopover from "./AddItemsPopover";

function MainTopSection() {
  const allSelectedFiles = useRecoilValue(selectedFilesState);

  return (
    <div className="h-[74px] bg-white shadow w-full flex items-center justify-between px-[16px]">
      <div className="ml-[20px] flex items-center gap-[12px]">
        {allSelectedFiles && allSelectedFiles.length > 0 ? (
          allSelectedFiles.map((title, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center">
                <p>{title}</p>
              </div>
              {index !== allSelectedFiles.length - 1 && (
                <div className="flex items-center justify-center">
                  <ChevronRight className="mx-1" />
                </div>
              )}
            </React.Fragment>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center gap-[8px]">
        <AddFiltersPopover />
        <AddItemsPopover />
      </div>
    </div>
  );
}

export default MainTopSection;
