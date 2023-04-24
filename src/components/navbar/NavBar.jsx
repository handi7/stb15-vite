import { useState } from "react";
import { useNavigate } from "react-router";
import { navData } from "./navData";
import { Cross, Hamburger } from "./svgs";

export default function NavBar() {
  const navigate = useNavigate();
  const pathName = window.location.pathname;

  const [navbar, setNavbar] = useState(false);

  const navigateTo = (path) => {
    navigate(path);
    setNavbar(false);
  };

  const ListItem = ({ label, path }) => {
    const current = navbar && path === pathName;
    return (
      <li
        className={`${
          current ? "bg-green-800" : ""
        } text-white hover:text-indigo-200 cursor-pointer hover:bg-green-800 px-3 py-2 rounded-lg`}
        onClick={() => navigateTo(path)}
      >
        <span className="text-sm">{label}</span>
      </li>
    );
  };

  return (
    <nav className="w-full bg-green-900 shadow-lg shadow-green-700 fixed top-0">
      <div className="justify-between px-4 mx-auto lg:max-w-5xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-2 md:block">
            <div className="cursor-pointer" onClick={() => navigateTo("/")}>
              <img className="w-10" src="/images/ic_kms2.png" alt="logo" />
            </div>

            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <Hamburger /> : <Cross />}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul
              className={`${
                navbar ? "space-y-2" : ""
              } items-center justify-end md:flex md:space-x-2`}
            >
              {navData?.map((nav) => {
                return (
                  <ListItem key={nav?.id} label={nav?.label} path={nav?.path} />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
