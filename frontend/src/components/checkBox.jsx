import React from "react";

function Checkbox({ checked, setChecked, label }) {
  return (
    <div className="w-fit">
 <label
      className={`flex mt-2 items-center whitespace-nowrap justify-center rounded-md border ${
        checked ? "border-primary border-2 bg-red-100" : "border-gray-200"
      } py-2 px-4 cursor-pointer`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="sr-only"
      />
      <span className="text-sm">{label}</span>
    </label>
    </div>
   
  );
}

export default Checkbox;
