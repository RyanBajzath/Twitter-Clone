import { useEffect, useState } from "react";
import Tweet from "./Tweet";

const ProfileMenu = ({ handle }) => {
  const [tweets, setTweets] = useState(null);
  const [tweetsIds, setTweetsIds] = useState(null);
  const [button, setButton] = useState("tweets");

  useEffect(() => {
    fetch(`/api/${handle}/feed`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { tweetsById, tweetIds } = data;
        setTweets(tweetsById); //object
        setTweetsIds(tweetIds);
      });
  }, []);

  const handleMenuSwitch = (event) => {
    event.preventDefault();
    const id = event.target.id;
    console.log(id);
    setButton(id);
    //click the button
    //update the state to value button aka using setState
  };

  return (
    <div>
      <div>
        <button
          id="tweets"
          onClick={(event) => {
            handleMenuSwitch(event);
          }}
        >
          Tweets
        </button>
        <button
          id="media"
          onClick={(event) => {
            handleMenuSwitch(event);
          }}
        >
          Media
        </button>
        <button
          id="likes"
          onClick={(event) => {
            handleMenuSwitch(event);
          }}
        >
          Likes
        </button>
      </div>
      <div>
        {/* conditional rendering */}
        {button === "tweets" && (
          <div>
            {tweetsIds ? (
              tweetsIds.map((id) => {
                return <Tweet tweet={tweets[id]} />;
              })
            ) : (
              <div>loading...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
