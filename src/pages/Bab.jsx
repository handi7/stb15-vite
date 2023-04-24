import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../const";
import { IoIosArrowBack } from "react-icons/io";
import BabCard from "../components/card/BabCard";
import { Zoom } from "react-reveal";
import Spinner from "../components/Spinner";

export default function Bab() {
  const navigate = useNavigate();
  const params = useParams();
  const bab = params.bab;

  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getData = async (bab) => {
    try {
      const res = await axios.get(apiUrl + "/words/" + bab);
      setTimeout(() => {
        setData(res?.data);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bab) getData(bab);
  }, [params]);

  return (
    <div className="my-2">
      <button
        className="flex items-center text-gray-200 font-semibold space-x-2"
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack />
        <span>BAB {bab}</span>
      </button>

      {isLoading ? (
        <div className="h-96 flex justify-center items-center my-5">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 mt-3">
          {data?.data?.map((item, i) => {
            return <BabCard key={i} kor={item?.kor} ind={item?.ind} />;
          })}
        </div>
      )}
    </div>
  );
}
