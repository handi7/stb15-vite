import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../../const";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import SynonymCard from "../components/card/SynonymCard";
import Pagination from "react-js-pagination";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import Spinner from "../components/Spinner";

export default function Synonym() {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const key = query?.get("key");
  const page = query?.get("page") || 1;

  const [data, setData] = useState({});
  const [text, setText] = useState("");
  const [isLoading, setLoading] = useState(false);

  const getData = async (page, key) => {
    try {
      setLoading(true);
      const offset = (+page - 1) * 20;
      const res = await axios.get(
        apiUrl + `/synonyms?offset=${offset}${key ? `&key=${key}` : ""}`
      );
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onChange = (e) => {
    if (e.target.value) {
      setText(e.target.value);
    } else {
      setText("");
      navigate(`/synonym?page=1`);
    }
  };

  const onSearch = () => {
    if (text) navigate(`/synonym?page=1&key=${text}`);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && text) onSearch();
  };

  const paginate = (selected) => {
    navigate(`/synonym?page=${selected}${key ? `&key=${key}` : ""}`);
  };

  useEffect(() => {
    getData(page, key);
  }, [query]);

  return (
    <div className="my-2">
      <div className="flex justify-between">
        <span className="text-white font-semibold">SYNONYM</span>
        <div className="space-x-3">
          <input
            type="text"
            className="py-1 px-3 rounded-lg"
            placeholder="search"
            value={text}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <button className="bg-white py-1 px-3 rounded-lg" onClick={onSearch}>
            search
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center mt-10">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {data?.data?.map((item, i) => {
              return (
                <SynonymCard
                  key={i}
                  ind={item?.ind}
                  kor={item?.kor}
                  keyword={key}
                />
              );
            })}
          </div>

          <Pagination
            itemsCountPerPage={20}
            totalItemsCount={data?.count}
            activePage={+page}
            firstPageText={<MdKeyboardDoubleArrowLeft size={24} />}
            prevPageText={<MdKeyboardArrowLeft size={24} />}
            nextPageText={<MdKeyboardArrowRight size={24} />}
            lastPageText={<MdKeyboardDoubleArrowRight size={24} />}
            itemClassFirst="px-1 bg-transparent text-white"
            itemClassPrev="px-1 bg-transparent text-white"
            itemClassNext="px-1 bg-transparent text-white"
            itemClassLast="px-1 bg-transparent text-white"
            innerClass="flex justify-center font-semibold space-x-3 mt-10"
            activeClass="bg-green-500 text-white px-3 rounded-lg cursor-pointer"
            itemClass="flex items-center bg-white text-green-800 px-3 rounded-lg cursor-pointer"
            onChange={paginate}
          />
        </>
      )}
    </div>
  );
}
