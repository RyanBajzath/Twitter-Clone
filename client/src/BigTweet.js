import React, { useEffect, useState } from "react";
import moment from "moment";
import { FiHeart, FiMessageCircle, FiDownload, FiRepeat } from "react-icons/fi";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const BigTweet = ({ tweet }) => {
  // console.log(tweet);
  const [_isLiked, setIsLiked] = useState(0);
  const [_numLikes, setNumLikes] = useState(0);

  const [_isRetweeted, setIsRetweeted] = useState(0);
  const [_numRetweets, setNumRetweets] = useState(0);

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

  const date = moment(tweet?.timestamp).format("MMM Do ");

  return (
    <>
      <Wrapper>
        <Avatar src={tweet?.author?.avatarSrc} />
        <DisplayName>{tweet?.author?.displayName}</DisplayName>
        <p>@{tweet?.author?.handle}</p>
        <SytledStatus>{tweet?.status}</SytledStatus>

        {tweet?.media?.length > 0 && (
          <Photo src={tweet.media[0]?.url} alt="img" />
        )}
        <StyledDate>{date}</StyledDate>
        <ButtonWrapper>
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
            <FiMessageCircle />
          </StyledButton>
          <StyledButton>
            <FiDownload />
          </StyledButton>
          <StyledButton>
            <FiRepeat
              onClick={(e) => {
                handleRetweet(e);
              }}
            />
            <span>{_numRetweets}</span>
          </StyledButton>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  /* outline: red 5px solid; */
  margin-left: 250px;
`;

const Avatar = styled.img`
  width: 50px;

  height: auto;
  border-radius: 50%;
  float: left;
`;
const DisplayName = styled.span`
  font-weight: bold;
`;
const Photo = styled.img`
  width: 70vw;
  border-radius: 8px;
`;

const SytledStatus = styled.p`
  font-size: 25px;
`;

const StyledDate = styled.p`
  /* margin-left: 200px; */
`;

const ButtonWrapper = styled.div`
  display: flex;

  justify-content: space-around;
`;

const StyledButton = styled.button`
  border: none;
`;
export default BigTweet;
