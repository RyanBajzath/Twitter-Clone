import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { CurrentUserContext } from "./CurrentUserContext";
import Error from "./Error";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { FiCalendar } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import moment from "moment";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { CurrentUser, status } = useContext(CurrentUserContext);
  // const [currentUser, setCurrentUser] = useState(null);
  let { profileId } = useParams();
  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProfile(data.profile);
      });
  }, [profileId]);

  if (status === "error") {
    return <Error message="Please come back to the profile later" />;
  }
  // console.log(profile);
  // not really sure how this works but it seems to fix my empty page ... Need to look more into this later.
  if (!profile) {
    return <CircularProgress />;
  }
  const date = moment(profile.joined).format("MMM Do ");
  return (
    <>
      <Wrapper>
        <BannerImg src={profile.bannerSrc} />
        <Avatar src={profile.avatarSrc} />
        <DisplayName>{profile.displayName}</DisplayName>
        {/* {profile.isFollowingYou? console.log("yes")} */}
        <span>@{profile.handle}</span>
        <FollowingSpan>
          {profile.isFollowingYou ? `Follwing you` : `Not following you`}
        </FollowingSpan>
        <p>{profile.bio}</p>
        <span>
          <GrLocation />

          {profile.location}
        </span>
        <span>
          {" "}
          <StyledJoined>
            <FiCalendar /> joined {date}
          </StyledJoined>
        </span>
        <FollowerWrap>
          <StyledFollowing>
            <Bold>{profile.numFollowing} </Bold>following
          </StyledFollowing>
          <StyledFollowers>
            <Bold>{profile.numFollowers}</Bold> followers
          </StyledFollowers>
        </FollowerWrap>
      </Wrapper>
      <ProfileMenu handle={profile.handle} />
    </>
  );
};
const Bold = styled.span`
  font-weight: bold;
`;
const StyledFollowing = styled.p`
  /* margin-left: 100px; */
`;
const StyledFollowers = styled.p`
  margin-left: 50px;
`;
const FollowerWrap = styled.div`
  margin-top: 10px;
  display: flex;
`;

const BannerImg = styled.img`
  /* position: absolute; */
  width: 100%;
  z-index: 0;
`;

const Wrapper = styled.div`
  margin-left: 300px;
  /* position: absolute; */
  width: 50vw;
`;

const Avatar = styled.img`
  z-index: 1;
  width: 125px;
  height: auto;
  border-radius: 50%;
  /* float: left; */
  margin-top: -75px;
`;
const DisplayName = styled.p`
  font-weight: bold;
`;

const FollowingSpan = styled.span`
  margin-left: 10px;
  background-color: #c0c0c0;
  opacity: 80%;
`;
const StyledJoined = styled.span`
  margin-left: 20px;
`;

export default Profile;
