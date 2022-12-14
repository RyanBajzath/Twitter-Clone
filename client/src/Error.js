import React from "react";
import { FaBomb } from "react-icons/fa";
import styled from "styled-components";

const Error = ({ message }) => {
  return (
    <Wrapper>
      <FaBomb size={50} />
      <h1>An unknown error has occured</h1>
      {/* <span>Please try refreshing the page, or </span> */}
      <span>
        Please try refreshing the page, or
        <a href="#"> contact support </a> , if the problem continues.
      </span>
      <p>{message}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* margin-top: 100px; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* margin-top: 100px; */
`;

export default Error;
