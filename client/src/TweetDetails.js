import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Routes, Route, useParams } from "react-router-dom";

const TweetDetails = () => {
  const [tweetDetails, setTweetDetails] = useState(null);

  // let { profileId } = useParams();
  useEffect(() => {
    fetch(`/tweet/:tweetId`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setTweetDetails(data);
      });
  }, []);
  // if (!tweetDetails) {
  //   return <div>Loading...</div>;
  // }

  return <div>TweetDetails</div>;
};

export default TweetDetails;
