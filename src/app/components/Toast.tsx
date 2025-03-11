"use client";

import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { toastDataState } from "../redux/atoms";
import { X } from "lucide-react";

function Toast() {
  const [toastTriggerData, setToastTriggerData] =
    useRecoilState(toastDataState);

  const handleToastTriggerClose = () => {
    setToastTriggerData((prev) => ({
      ...prev,
      trigger: false,
    }));
  };

  useEffect(() => {
    if (toastTriggerData.trigger) {
      setTimeout(() => {
        setToastTriggerData((prev) => ({
          ...prev,
          trigger: false,
        }));
      }, 3000);
    }
  }, [toastTriggerData.trigger]);

  return (
    <div
      className={`${
        toastTriggerData.trigger
          ? " min-w-[200px] h-fit min-h-[30px]"
          : "invisible"
      } absolute top-[10px] right-[10px] min-w-[200px] h-fit min-h-[30px] px-[12px] py-[8px] ${
        toastTriggerData.isError ? "bg-red-700" : "bg-green-700"
      }  rounded-[10px] shadow transition-all flex  justify-between items-center text-white gap-[12px]`}
    >
      <p>{toastTriggerData.message}</p>
      <X className="cursor-pointer" onClick={handleToastTriggerClose} />
    </div>
  );
}

export default Toast;
