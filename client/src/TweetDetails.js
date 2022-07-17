import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import BigTweet from "./BigTweet";
import Error from "./Error";
import { CircularProgress } from "@mui/material"; //import circle animation

import { FiHeart, FiMessageCircle, FiDownload, FiRepeat } from "react-icons/fi";

const TweetDetails = () => {
  const [tweetDetails, setTweetDetails] = useState(null);
  const [status, setStatus] = useState("idle");

  //useParams get data from URL
  let { tweetId } = useParams();
  // console.log(useParams());

  useEffect(() => {
    // /api/tweet/:tweetId
    setStatus("loading");
    fetch(`/api/tweet/${tweetId}`)
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
        setTweetDetails(data?.tweet);
        // console.log(data);
      })
      .catch((e) => {
        setStatus("error");
      });
  }, []);

  if (status === "error") {
    return (
      <div>
        <Error message="please come back to the specific Tweet later :)" />
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  console.log(tweetDetails);

  return (
    <div>
      <BigTweet tweet={tweetDetails} />
    </div>
  );
};

export default TweetDetails;
