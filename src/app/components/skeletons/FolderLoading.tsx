import React from "react";

function FolderLoading() {
  return (
    <tr
      className="h-fit
                   bg-primary-100 shadow border-spacing-[10px] overflow-hidden my-[10px] cursor-pointer transition-all"
    >
      <td
        colSpan={5}
        className="rounded-[10px] shadow overflow-hidden w-full border border-gray-100 animate-pulse"
      >
        <div className="h-[50px] w-full bg-primary-200/70 rounded"></div>
      </td>
    </tr>
  );
}

export default FolderLoading;
