import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Bookmarks from "./Bookmarks";
import { CurrentUserContext } from "./CurrentUserContext";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import TweetDetails from "./TweetDetails";
import Error from "./Error";

const App = () => {
  const { CurrentUser, status } = useContext(CurrentUserContext);
  // console.log(useContext(CurrentUserContext));

  if (status === "loading") {
    return <div>Loading...test</div>;
  }
  // if (status === "error") {
  //   return <Error />;
  // }
  return (
    <div>
      <Router>
        <Sidebar />

        <Switch>
          <Route exact path="/">
            <HomeFeed />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route path="/tweet/:tweetId">
            <TweetDetails />
          </Route>
          <Route path="/profile/:profileId">
            <Profile />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
