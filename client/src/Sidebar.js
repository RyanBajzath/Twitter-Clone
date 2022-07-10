import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { icons } from "react-icons/lib";
import { ReactComponent as Logo } from "./logo.svg";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo />
      <StyledLink to="/">
        {" "}
        <FiHome /> Home
      </StyledLink>
      <StyledLink to="/profile/me">
        {" "}
        <FiUser />
        Profile
      </StyledLink>
      <StyledLink to="/notifications">
        <FiBell />
        Notifications
      </StyledLink>
      <StyledLink to="/bookmarks">
        {" "}
        <FiBookmark />
        Bookmarks
      </StyledLink>
      {/* <StyledLink to="/tweet/:tweetId"></StyledLink> */}
      <button>meow</button>
    </SidebarContainer>
  );
};

const StyledLink = styled(NavLink)`
  margin-bottom: 10px;
  text-decoration: none;
  align-items: center;
  color: black;
  width: fit-content;
  padding: 5px;

  display: block;
  &:hover {
    background-color: #d9dbde;
    border-radius: 8px;
    color: purple;
  }
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10vw;
  text-decoration: none;
`;

export default Sidebar;
