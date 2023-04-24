import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Ruang() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

  const getRooms = () => {
    const tempRooms = [];
    for (let i = 3; i <= 60; i++) {
      tempRooms.push({ bab: i, title: `BAB ${i}` });
    }
    setRooms(tempRooms);
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div>
      <p className="text-xl text-white font-semibold">PILIH BAB</p>

      <div className="grid grid-cols-2 gap-3 mt-5 sm:grid-cols-3 md:grid-cols-5">
        {rooms?.map((room) => {
          return (
            <button
              key={room?.bab}
              className=" bg-white p-2 rounded-lg"
              onClick={() => navigate(`/bab/${room?.bab}`)}
            >
              {room?.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
