import { style } from "@mui/system";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

const TextBox = ({ setPostedTweet }) => {
  const [input, setInput] = useState("");
  const [wordCount, setWordCount] = useState(280);

  const handleChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value); //get the value of the event using dot notation.
  };

  const handleSubmit = () => {
    console.log(input);
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
      });
  };

  const { currentUser } = useContext(CurrentUserContext);
  //   console.log(currentUser);
  return (
    <Wrapper>
      <div>
        <CurrentUserAvatar src={currentUser?.profile?.avatarSrc} />
        <StyledInput
          onChange={(e) => {
            handleChange(e);
            setWordCount(280 - e.target.value.length);
          }}
        />
        <WordCount>{wordCount}</WordCount>
        <StyledButton
          onClick={handleSubmit}
          disabled={wordCount < 0 ? true : false}
        >
          {/* Use same tech above for styling */}
          Meow
        </StyledButton>
      </div>
    </Wrapper>
  );
};

const CurrentUserAvatar = styled.img`
  width: 100px;
  height: auto;
  border-radius: 50%;
`;

const Wrapper = styled.div`
  /* box-shadow: 1px; */
  /* outline: 1px black solid; */
  width: 50vw;
  height: 25vh;
  box-shadow: 1px 1px;
  margin-left: 300px;
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
  height: 15vh;
  width: 400px;
  /* margin-top: -100px; */
`;
export default TextBox;
