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
import { NavLink, useHistory } from "react-router-dom";

const Tweet = ({ tweet }) => {
  // console.log(tweet);
  const {
    isLiked,
    numLikes,
    numRetweets,
    isRetweeted,
    status,
    timestamp,
    id,
    retweetFrom,
    author: { avatarSrc, displayName, handle, bannerSrc },
  } = tweet;
  const date = moment(timestamp).format("MMM Do ");

  //using the server data as a reference
  const [_isLiked, setIsLiked] = useState(isLiked);
  const [_numLikes, setNumLikes] = useState(numLikes);

  const [_isRetweeted, setIsRetweeted] = useState(isRetweeted);
  const [_numRetweets, setNumRetweets] = useState(numRetweets);

  const [_status, _setStatus] = useState("idle");

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
        {retweetFrom && (
          <StyledRetweetWrap>
            <FiRepeat />
            <p>{retweetFrom.handle} retweeted</p>
          </StyledRetweetWrap>
        )}
        <div
          onClick={(e) => {
            handClick();
          }}
        >
          <Avatar src={avatarSrc} />
          <div
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/profile/${handle}`);
            }}
          >
            <DisplayName>{displayName}</DisplayName>
            <StyledHandle>@{handle}</StyledHandle>
            <StyledDate>{date}</StyledDate>
          </div>
          <p>{status}</p>

          {tweet.media.length > 0 && (
            <Photo src={tweet.media[0]?.url} alt="img" />
          )}
        </div>
        <ButtonWrapper>
          <StyledButton>
            <FiMessageCircle />
          </StyledButton>
          <StyledButton>
            <FiRepeat
              onClick={(e) => {
                handleRetweet(e);
              }}
            />
            <span>{_numRetweets}</span>
          </StyledButton>
          <StyledButton>
            <FiHeart
              //on click to change state
              onClick={(e) => {
                handleLike(e);
              }}
              style={{
                color: _numLikes > 0 && "red",
              }}
            />

            <span>{_numLikes}</span>
          </StyledButton>
          <StyledButton>
            <FiDownload />
          </StyledButton>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  /* outline: black 2px solid; */
  width: 50vw;
  /* max-width: 50vw; */
  margin-top: 30px;
  /* box-shadow: 10px 10px; */
  margin-left: 350px;
`;

const StyledHandle = styled.span`
  margin-left: 10px;
`;

const StyledDate = styled.span`
  margin-left: 10px;
`;

const Avatar = styled.img`
  width: 70px;
  height: auto;
  border-radius: 50%;
  float: left;
  margin-right: 15px;
`;

const Photo = styled.img`
  width: 50vw;
  border-radius: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;

  justify-content: space-around;
`;

const StyledButton = styled.button`
  border: none;
`;

const DisplayName = styled.span`
  font-weight: bold;
`;

const StyledRetweetWrap = styled.div`
  display: flex;
  align-items: center;
  color: grey;
`;
export default Tweet;
