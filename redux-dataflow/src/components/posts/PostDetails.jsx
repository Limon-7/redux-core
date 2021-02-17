import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactionButtons from "../ReactionButton/ReactionButtons";
import TimeAgo from "../TimeAgo/TimeAgo ";
import Users from "../users/users";
import "./PostDetails.css";

function PostDetails(props) {
  console.log("Props", props);
  const { postId } = props.match.params;
  console.log("Post-Id:", postId);
  const post = useSelector((state) =>
    state.post.find((post) => post.id === postId)
  );
  console.log("post", post);
  if (!post) {
    return <h2>Post not found!</h2>;
  }
  return (
    <div className="PostDetails">
      <h1>Post Deatils</h1>
      <div className="postDetails__info">
        <h2>{post.title}</h2>
        <Users userId={post.user} className="user" />
        <TimeAgo timestamp={post.date} className="timeAgo" />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <div className="postDeatils__btn">
          <Link to={`/editPosts/${postId}`} className="button">
            Edit Post
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
