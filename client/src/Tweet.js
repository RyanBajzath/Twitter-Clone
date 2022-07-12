import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  FiHeart,
  FiMessageCircle,
  FiDownload,
  FiRepeat,
  FiToggleLeft,
} from "react-icons/fi";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Tweet = ({ tweet }) => {
  console.log(tweet);
  const {
    isLiked,
    numLikes,
    numRetweets,
    isRetweeted,
    status,
    timestamp,
    id,
    author: { avatarSrc, displayName, handle, bannerSrc },
  } = tweet;
  const date = moment(timestamp).format("MMM Do ");

  //using the server data as a reference
  const [_isLiked, setIsLiked] = useState(isLiked);
  const [_numLikes, setNumLikes] = useState(numLikes);

  const [_isRetweeted, setIsRetweeted] = useState(isRetweeted);
  const [_numRetweets, setNumRetweets] = useState(numRetweets);

  let history = useHistory();
  const handClick = () => {
    history.push(`/tweet/${id}`);
  };

  //this function changes the state when clicked and changes the num likes.
  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!_isLiked);
    if (_isLiked) {
      setNumLikes(_numLikes - 1);
    } else {
      setNumLikes(_numLikes + 1);
    }
    // console.log(_numLikes);
  };

  const handleRetweet = (e) => {
    e.preventDefault();
    setIsRetweeted(!_isRetweeted);
    if (_isRetweeted) {
      setNumRetweets(_numRetweets - 1);
    } else {
      setNumRetweets(_numRetweets + 1);
    }
    // console.log(_numRetweets);
  };
  // ! means is not   soo if something is true then !something is false
  return (
    <>
      <Wrapper>
        <div onClick={handClick}>
          <img src={avatarSrc} />
          <p>{displayName}</p>
          <p>@{handle}</p>
          <p>{status}</p>
          <p>{date}</p>
          {tweet.media.length > 0 && (
            <img src={tweet.media[0]?.url} alt="img" />
          )}
        </div>
        <div>
          <button>
            <FiHeart
              //on click to change state
              onClick={(e) => {
                handleLike(e);
              }}
            />

            <span>{_numLikes}</span>
          </button>
          <button>
            <FiMessageCircle />
          </button>
          <button>
            <FiDownload />
          </button>
          <button>
            <FiRepeat
              onClick={(e) => {
                handleRetweet(e);
              }}
            />
            <span>{_numRetweets}</span>
          </button>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  outline: red 5px solid;
`;
export default Tweet;
