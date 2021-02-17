import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postUpdated } from "../../redux/PostSlice";

import "./EditPost.css";

function EditPost({ match }) {
  const { postId } = match.params;
  const post = useSelector((state) =>
    state.post.find((post) => post.id === postId)
  );

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(
        postUpdated({
          id: postId,
          title,
          content,
        })
      );
      history.replace(`/posts/${postId}`);
    }
  };

  return (
    <div className="editPost">
      <h2>Edit Post</h2>
      <form className="form">
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" className="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </div>
  );
}

export default EditPost;
