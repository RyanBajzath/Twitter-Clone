import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  // const [currentUser, setCurrentUser] = useState(null);
  let { profileId } = useParams();
  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProfile(data.profile);
      });
  }, [profileId]);

  // console.log(profile);
  // not really sure how this works but it seems to fix my empty page ... Need to look more into this later.
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={profile.bannerSrc} />
      <img src={profile.avatarSrc} />
      <p>{profile.displayName}</p>
      <p>{profile.handle}</p>
      <p>{profile.bio}</p>
      <p>{profile.location}</p>
      <p>{profile.joined}</p>
      <p>{profile.numFollowing}</p>
      <p>{profile.numFollowers}</p>
      <ProfileMenu handle={profile.handle} />
    </div>
  );
};

export default Profile;
