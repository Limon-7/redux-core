import React from "react";
import "./App.css";

import { Redirect, Route, Switch } from "react-router-dom";
import Nav from "./components/nav/Nav";
import PostList from "./components/posts/PostList";
import AddPost from "./components/posts/AddPost";
import PostDetails from "./components/posts/PostDetails";
import EditPost from "./components/posts/EditPost";

function App() {
  return (
    <div className="app">
      <Nav />
      <div className="app__main">
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return (
                <React.Fragment>
                  <AddPost />
                  <PostList />
                </React.Fragment>
              );
            }}
          />
          <Route exact path="/posts/:postId" component={PostDetails} />
          <Route exact path="/editPosts/:postId" component={EditPost} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
