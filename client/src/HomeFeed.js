import React, { useEffect, useState } from "react";
import TextBox from "./TextBox";
import Tweet from "./Tweet";
import { CircularProgress } from "@mui/material";
import Error from "./Error";

const HomeFeed = () => {
  const [tweets, setTweets] = useState(null);
  const [tweetsIds, setTweetsIds] = useState(null);

  const [status, setStatus] = useState("idle");

  const [postedTweet, setPostedTweet] = useState("");

  useEffect(() => {
    if (status === null) {
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
        console.log(data);
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
        <Error />
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

  return (
    <div>
      <TextBox setPostedTweet={setPostedTweet} />
      {tweetsIds?.map((id) => {
        return <Tweet tweet={tweets[id]} />;
      })}
    </div>
  );
};

export default HomeFeed;
