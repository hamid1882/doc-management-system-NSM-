import React from "react";
import { User } from "lucide-react";

function Sidebar() {
  return (
    <div className="h-screen w-[80px] bg-primary-500 p-[15px] text-center flex flex-col  justify-between">
      <div className="space-y-[50px]">
        <div className="h-[50px] w-[50px] bg-primary-200 hover:bg-primary-200/70 rounded-[10px] cursor-pointer"></div>
        <div className="flex flex-col items-center gap-[8px]">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-[40px] w-[40px] bg-primary-100/20 rounded-[10px] cursor-pointer hover:bg-primary-100/40"
            ></div>
          ))}
        </div>
      </div>
      <div>
        <div className="h-[50px] w-[50px] bg-primary-100/20 rounded-full flex justify-center items-center cursor-pointer">
          <User className="text-white w-full h-full p-[10px]" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
