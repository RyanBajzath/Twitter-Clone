import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import BigTweet from "./BigTweet";

import { FiHeart, FiMessageCircle, FiDownload, FiRepeat } from "react-icons/fi";

const TweetDetails = () => {
  const [tweetDetails, setTweetDetails] = useState(null);
  //useParams get data from URL
  let { tweetId } = useParams();
  // console.log(useParams());

  useEffect(() => {
    // /api/tweet/:tweetId
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweetDetails(data.tweet);
        // console.log(data);
      });
  }, []);

  if (!tweetDetails) {
    return <div>Loading...</div>;
  }
  console.log(tweetDetails);

  return (
    <div>
      <BigTweet tweet={tweetDetails} />
    </div>
  );
};

export default TweetDetails;
