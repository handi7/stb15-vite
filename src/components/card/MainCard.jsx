import React from "react";
import { capitalize } from "../../hooks/wording";

export default function MainCard({ kor, ind }) {
  return (
    <div className="bg-white py-2 px-4 rounded-lg shadow-sm shadow-green-400 text-green-800 font-semibold sm:flex transition delay-150 duration-300 ease-in-out">
      <div className="sm:w-1/2">
        <span>{kor}</span>
      </div>
      <div className="sm:w-1/2">
        <span>{capitalize(ind)}</span>
      </div>
    </div>
  );
}
