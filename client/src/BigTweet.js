import React, { useEffect } from "react";
import moment from "moment";
import { FiHeart, FiMessageCircle, FiDownload, FiRepeat } from "react-icons/fi";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const BigTweet = ({ tweet }) => {
  // console.log(tweet);

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
  margin-left: 200px;
`;
export default BigTweet;
