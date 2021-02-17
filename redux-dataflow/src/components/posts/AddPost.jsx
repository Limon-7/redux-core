import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "../../redux/PostSlice";

import "./AddPost.css";

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleTitleOnchange = (e) => setTitle(e.target.value);
  const handleContentOnchange = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  // || Boolean(userId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content && title && userId) {
      dispatch(postAdded(title, content, userId));

      setTitle("");
      setContent("");
    }
  };
  return (
    <div className="addPost">
      <h1>Add a new post</h1>
      <form className="form">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          id="title"
          onChange={handleTitleOnchange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value="">select</option>
          {usersOptions}
        </select>

        <label htmlFor="content">Content</label>
        <textarea
          name={content}
          value={content}
          id="content"
          onChange={handleContentOnchange}
        />
        <button onClick={handleSubmit} disabled={!canSave}>
          Save post
        </button>
      </form>
    </div>
  );
}

export default AddPost;
