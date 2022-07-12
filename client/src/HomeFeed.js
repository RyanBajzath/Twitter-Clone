import React, { useEffect, useState } from "react";
import TextBox from "./TextBox";
import Tweet from "./Tweet";

const HomeFeed = () => {
  const [tweets, setTweets] = useState(null);
  const [tweetsIds, setTweetsIds] = useState(null);
  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const { tweetsById, tweetIds } = data;
        setTweets(tweetsById); //object
        setTweetsIds(tweetIds);
      });
  }, []);

  if (!tweets) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TextBox />
      {tweetsIds.map((id) => {
        return <Tweet tweet={tweets[id]} />;
      })}
    </div>
  );
};

export default HomeFeed;
