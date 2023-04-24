import React, { useState } from "react";
import { capitalize } from "../../hooks/wording";

export default function BabCard({ kor, ind }) {
  const [text, setText] = useState(kor);
  const [hover, setHover] = useState(false);

  const onEnter = () => {
    setText(capitalize(ind));
    setHover(true);
  };

  const onLeft = () => {
    setTimeout(() => {
      setText(kor);
      setHover(false);
    }, 1000);
  };

  return (
    <div
      className={`bg-white rounded-lg font-semibold text-green-900 text-center cursor-pointer p-3 transition delay-150 ${
        hover ? "bg-yellow-300" : ""
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeft}
    >
      <span>{text}</span>
    </div>
  );
}
