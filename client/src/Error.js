import React from "react";
import { FaBomb } from "react-icons/fa";

const Error = () => {
  return (
    <div>
      <FaBomb />
      <h1>An unknown error has occured</h1>
      {/* <span>Please try refreshing the page, or </span> */}
      <span>
        Please try refreshing the page, or
        <a href="#"> contact support </a> , if the problem continues.
      </span>
    </div>
  );
};

export default Error;
