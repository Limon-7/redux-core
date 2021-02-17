import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../../redux/PostSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

function ReactionButtons({ post }) {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    console.log(name, emoji);
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji}
        {post.reactions[name]}
        {/* {emoji} {post.reactions[name]} */}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
}

export default ReactionButtons;
