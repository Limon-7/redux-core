import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { PostsList } from "./components/PostsList";
import { SinglePostPage } from "./components/SinglePostPage";
import { EditPostForm } from "./components/EditPostForm";

import "./App.css";
import { AddPostForm } from "./components/AddPostForm";

function App() {
  return (
    <div>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
