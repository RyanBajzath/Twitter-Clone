import React, { useContext, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const TextBox = () => {
  const [input, setInput] = useState("");
  const [wordCount, setWordCount] = useState(280);

  //

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
      .then((res) => res.json())
      .then((data) => console.log(data)) //why undefined?
      .then(() => setInput(""))
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    currentUser: {
      profile: { avatarSrc },
    },
  } = useContext(CurrentUserContext);
  //   console.log(currentUser);
  return (
    <div>
      <div>
        <img src={avatarSrc} />
        <input
          onChange={(e) => {
            handleChange(e);
            setWordCount(280 - e.target.value.length);
          }}
        />
      </div>
      <span>{wordCount}</span>
      <button onClick={handleSubmit} disabled={wordCount < 0 ? true : false}>
        {/* Use same tech above for styling */}
        Meow
      </button>
    </div>
  );
};

export default TextBox;
