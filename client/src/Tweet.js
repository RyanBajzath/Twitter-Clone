import React, { useEffect } from "react";
import moment from "moment";
import { FiHeart, FiMessageCircle, FiDownload, FiRepeat } from "react-icons/fi";

const Tweet = ({ tweet }) => {
  // console.log(tweet);
  const {
    status,
    timestamp,
    author: { avatarSrc, displayName, handle, bannerSrc },
  } = tweet;
  const date = moment(timestamp).format("MMM Do ");
  return (
    <>
      <div>
        <img src={avatarSrc} />
        <p>{displayName}</p>
        <p>@{handle}</p>
        <p>{status}</p>
        <p>{date}</p>
        {tweet.media.length > 0 && <img src={tweet.media[0]?.url} alt="img" />}
        <div>
          <button>
            <FiHeart />
          </button>
          <button>
            <FiMessageCircle />
          </button>
          <button>
            <FiDownload />
          </button>
          <button>
            <FiRepeat />
          </button>
        </div>
      </div>
    </>
  );
};
export default Tweet;
