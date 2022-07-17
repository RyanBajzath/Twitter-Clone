import { useEffect, useState } from "react";
import styled from "styled-components";
import Tweet from "./Tweet";

const ProfileMenu = ({ handle }) => {
  const [tweets, setTweets] = useState(null);
  const [tweetsIds, setTweetsIds] = useState(null);
  const [button, setButton] = useState("tweets");

  useEffect(() => {
    fetch(`/api/${handle}/feed`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { tweetsById, tweetIds } = data;
        setTweets(tweetsById); //object
        setTweetsIds(tweetIds);
      });
  }, []);

  const handleMenuSwitch = (event) => {
    event.preventDefault();
    const id = event.target.id;
    console.log(id);
    setButton(id);
    //click the button
    //update the state to value button aka using setState
  };

  return (
    <div>
      <Wrapper>
        <StyledButton
          id="tweets"
          onClick={(event) => {
            handleMenuSwitch(event);
          }}
        >
          Tweets
        </StyledButton>
        <StyledButton
          id="media"
          onClick={(event) => {
            handleMenuSwitch(event);
          }}
        >
          Media
        </StyledButton>
        <StyledButton
          id="likes"
          onClick={(event) => {
            handleMenuSwitch(event);
          }}
        >
          Likes
        </StyledButton>
      </Wrapper>
      <div>
        {/* conditional rendering */}
        {button === "tweets" && (
          <div>
            {tweetsIds ? (
              tweetsIds.map((id) => {
                return <Tweet tweet={tweets[id]} key={id} />;
              })
            ) : (
              <div>loading...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StyledButton = styled.button`
  border: none;
`;

const Wrapper = styled.div`
  margin-left: 250px;
  display: flex;
  justify-content: space-around;
  width: 50vw;
  margin-top: 20px;
`;

export default ProfileMenu;
