import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { apiUrl } from "../../const";
import MainCard from "../components/card/MainCard";
import Spinner from "../components/Spinner";

export default function Home() {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const key = query?.get("key");

  const [searchText, setText] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = async (keyword) => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/word/?key=${keyword}`);
      console.log(res);
      setTimeout(() => {
        setLoading(false);
        setData(res.data);
      }, 500);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onBtnSearch = () => {
    if (searchText) navigate(`/?key=${searchText}`);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && searchText) navigate(`/?key=${searchText}`);
  };

  const onChange = (e) => {
    if (e.target.value) {
      setText(e.target.value);
    } else {
      setText("");
      navigate("/");
      setData([]);
    }
  };

  useEffect(() => {
    if (key) {
      getData(key);
      setText(key);
    }
  }, [query]);

  return (
    <div>
      <div className="flex flex-col items-center mt-2 space-y-3">
        <label className="text-white font-semibold">Pencarian</label>
        <input
          type="text"
          className="w-4/5 py-2 px-3 rounded-lg text-sm sm:w-1/2 hover:bg-green-200"
          placeholder="Ketik untuk mencari. Contoh: 지급일 atau halo"
          value={searchText}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />

        {isLoading ? (
          <div className="flex justify-center items-center my-5">
            <Spinner />
          </div>
        ) : (
          <button
            className="w-36 bg-white text-green-900 font-semibold rounded-lg px-3 py-2 hover:bg-green-200"
            onClick={onBtnSearch}
          >
            Cari
          </button>
        )}
      </div>

      <div className="space-y-2 p-3">
        {!isLoading && data?.count > 0 && (
          <p className="text-white text-sm my-3">
            Ditemukan {data?.count} hasil pencarian dengan kata kunci "
            {searchText}"
          </p>
        )}

        {!isLoading &&
          data?.data?.map((item, i) => {
            return <MainCard key={i} kor={item?.kor} ind={item?.ind} />;
          })}

        {!isLoading && !data?.data?.length && (
          <div className="text-center text-white mt-10">
            <p>Kumpulan kosakata dari buku Standard Textbook tahun 2015</p>
            <p>EPS TOPIK</p>
            <div className="flex justify-center my-3">
              <img className="w-24" src="/images/ic_kms2.png" alt="logo" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
