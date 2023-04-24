import React from "react";
import NavBar from "../navbar/NavBar";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <NavBar />
      <div className="w-full flex justify-center bg-green-800 pt-18">
        <div className="w-full min-h-screen px-5 py-20 max-w-5xl">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}
