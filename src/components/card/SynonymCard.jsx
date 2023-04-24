import React from "react";
import { capitalize } from "../../hooks/wording";

export default function SynonymCard({ kor, ind, keyword }) {
  const get = (words) => {
    const arr = words?.split(",");
    const newWords = [];
    arr.forEach((word, i) => {
      const last = i === arr?.length - 1;
      if (word?.startsWith(keyword)) {
        newWords.push(
          <span key={i} className="bg-yellow-200">
            {last ? capitalize(word) : `${capitalize(word)}, `}
          </span>
        );
      } else {
        newWords.push(
          <span key={i}>
            {last ? capitalize(word) : `${capitalize(word)}, `}
          </span>
        );
      }
    });
    return newWords;
  };

  return (
    <div className="bg-white py-2 px-4 rounded-lg shadow-sm shadow-green-400 text-green-800 font-semibold">
      <p>{get(kor)}</p>
      <p>{get(ind)}</p>
    </div>
  );
}
