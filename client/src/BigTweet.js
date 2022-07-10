import React, { useEffect } from "react";
import moment from "moment";
import { FiHeart, FiMessageCircle, FiDownload, FiRepeat } from "react-icons/fi";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const BigTweet = ({ tweet }) => {
  // console.log(tweet);
  const {
    status,
    timestamp,
    id,
    author: { avatarSrc, displayName, handle, bannerSrc },
  } = tweet;
  const date = moment(timestamp).format("MMM Do ");

  return (
    <>
      <Wrapper>
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
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  outline: red 5px solid;
`;
export default BigTweet;
