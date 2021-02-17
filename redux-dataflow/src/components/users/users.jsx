import React from "react";
import { useSelector } from "react-redux";

function Users({ userId }) {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  );
  return (
    <div className="users">
      <span>{author ? author.name : "Unknown author"}</span>
    </div>
  );
}

export default Users;
