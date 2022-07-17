import { style } from "@mui/system";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import Error from "./Error";

const TextBox = ({ setPostedTweet }) => {
  const [input, setInput] = useState("");
  const [wordCount, setWordCount] = useState(280);
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value); //get the value of the event using dot notation.
  };

  const handleSubmit = () => {
    // console.log(input);
    //submit the input
    //contact the api
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: input }),
    };

    fetch("/api/tweet", options)
      .then((res) => {
        if (res.ok) {
          setPostedTweet(input);
        }
        return res.json();
      })
      .then((data) => console.log(data)) //why undefined?
      // .then(() => setInput(""))
      .catch((error) => {
        console.log(error);
        setStatus("error");
      });
  };

  const { currentUser } = useContext(CurrentUserContext);
  //   console.log(currentUser);
  return status === "error" ? (
    <Error message="Try reposting your tweet" />
  ) : (
    <Wrapper>
      <h2>Home</h2>
      <div>
        <CurrentUserAvatar src={currentUser?.profile?.avatarSrc} />
        <StyledInput
          placeholder="Whats happening?"
          onChange={(e) => {
            handleChange(e);
            setWordCount(280 - e.target.value.length);
          }}
        />
        <WordCount
          // {wordCount < 55 ? style={ color: "red" }:style={ color: "red" }}
          style={{
            color: wordCount < 0 ? "red" : wordCount < 55 ? "yellow" : "grey", //if elseif else kinda
          }}
        >
          {wordCount}
        </WordCount>
        <StyledButton
          onClick={handleSubmit}
          disabled={wordCount < 0 ? true : false}

          // {
          //   {wordCount} < 55
          //     ? (style = { color: "red" })
          //     : (style = { color: "red" })
          // }
        >
          {/* Use same tech above for styling */}
          Meow
        </StyledButton>
      </div>
    </Wrapper>
  );
};

const CurrentUserAvatar = styled.img`
  width: 70px;
  height: auto;
  border-radius: 50%;
  /* margin-right: 20px; */
`;

const Wrapper = styled.div`
  /* box-shadow: 1px; */
  /* outline: 1px black solid; */
  width: 50vw;
  height: 25vh;
  box-shadow: 1px 1px 5px gray;
  margin-left: 350px;
  margin-top: 50px;
  padding-bottom: 3%;
  padding-left: 5px;
`;
const StyledButton = styled.button`
  background-color: purple;
  color: white;
  outline: none;
  border-radius: 16px;
  /* margin-left: 45vw; */
  border: none;
  padding: 8px;
`;

const WordCount = styled.span`
  margin-left: 40vw;
`;

const StyledInput = styled.input`
  height: 10vh;
  width: 40vw;
  /* outline: px; */
  /* margin-top: -100px; */
  /* position: absolute; */
`;
export default TextBox;
