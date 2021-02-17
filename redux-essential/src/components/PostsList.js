import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const PostsList = () => {
  const posts = useSelector((state) => state.posts);

  const renderedPosts = posts.map((post) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        {/* <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div> */}
        <p className="post-content">{post.content}</p>

        {/* <ReactionButtons post={post} /> */}
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    );
  });

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
