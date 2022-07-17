import React, { useEffect, useState } from "react";
import TextBox from "./TextBox";
import Tweet from "./Tweet";
import { CircularProgress } from "@mui/material";
import Error from "./Error";
import styled from "styled-components";

const HomeFeed = () => {
  const [tweets, setTweets] = useState(null);
  const [tweetsIds, setTweetsIds] = useState(null);

  const [status, setStatus] = useState("idle");

  const [postedTweet, setPostedTweet] = useState("");

  useEffect(() => {
    if (tweets === null) {
      setStatus("loading");
    }
    // console.log(tweets);
    fetch("/api/me/home-feed")
      .then((res) => {
        // res.json();
        if (!res.ok) {
          setStatus("error");
          return;
        }
        setStatus("idle");
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        // const { tweetsById, tweetIds } = data;

        setTweets(data?.tweetsById); //object
        setTweetsIds(data?.tweetIds);
      })
      .catch((e) => {
        setStatus("error");
      });
  }, [postedTweet]);
  if (status === "error") {
    return (
      <div>
        <Error message="please come back to the HomeFeed later :)" />
      </div>
    );
  }

  if (status === "loading") {
    return (
      <StyledDiv>
        <CircularProgress />
      </StyledDiv>
    );
  }

  return (
    <div>
      <TextBox setPostedTweet={setPostedTweet} />
      {tweetsIds?.map((id) => {
        return <Tweet tweet={tweets[id]} />;
      })}
    </div>
  );
};

const StyledDiv = styled.div``;
export default HomeFeed;
