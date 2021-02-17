import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactionButtons from "../ReactionButton/ReactionButtons";
import TimeAgo from "../TimeAgo/TimeAgo ";
import Users from "../users/users";
import "./PostList.css";

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);
  return (
    <div className="postList">
      <h2>Posts</h2>
      {posts.map((post) => (
        <div className="postList__info" key={post.id}>
          <h3>{post.title}</h3>
          <Users userId={post.user} />
          <TimeAgo timestamp={post.date} />
          <p>{post.content}</p>
          <ReactionButtons post={post} />
          <Link to={`posts/${post.id}`} className="button muted-button">
            View deatils
          </Link>
        </div>
      ))}
    </div>
  );
}

export default PostList;
