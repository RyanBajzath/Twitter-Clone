import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { CurrentUserContext } from "./CurrentUserContext";
import Error from "./Error";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

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
        <span>{profile.location}</span>
        <span> joined {profile.joined}</span>
        <div>
          <span>{profile.numFollowing} following</span>
          <span>{profile.numFollowers} followers</span>
        </div>
      </Wrapper>
      <ProfileMenu handle={profile.handle} />
    </>
  );
};

const BannerImg = styled.img`
  /* position: absolute; */
  width: 100%;
`;

const Wrapper = styled.div`
  margin-left: 250px;
  /* position: absolute; */
  width: 50vw;
`;

const Avatar = styled.img`
  width: 100px;
  height: auto;
  border-radius: 50%;
  float: left;
`;
const DisplayName = styled.p`
  font-weight: bold;
`;

const FollowingSpan = styled.span`
  margin-left: 10px;
  background-color: #c0c0c0;
  opacity: 80%;
`;

export default Profile;
