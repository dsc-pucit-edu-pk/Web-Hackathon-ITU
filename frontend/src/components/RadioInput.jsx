import React from "react";

function RadioInput({ selected, setSelected, label, value }) {
  return (
    <div className="w-fit">
      <label
        className={`flex mt-2 items-center whitespace-nowrap justify-center rounded-md border ${
          selected === value ? "border-primary border-2 bg-red-100" : "border-gray-200"
        } py-2 px-4 cursor-pointer`}
      >
        <input
          type="radio"
          value={value}
          checked={selected === value}
          onChange={(e) => setSelected(e.target.value)}
          className="sr-only"
        />
        <span className="text-sm">{label}</span>
      </label>
    </div>
  );
}

export default RadioInput;
