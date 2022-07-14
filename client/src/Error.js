import React from "react";
import { FaBomb } from "react-icons/fa";

const Error = () => {
  return (
    <div>
      <FaBomb />
      <a href="#">You are stuck in a loop</a>
    </div>
  );
};

export default Error;
