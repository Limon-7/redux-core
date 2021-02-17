import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";

function TimeAgo({ timestamp }) {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <div className="timeago">
      <span title={timestamp}>
        {" "}
        &nbsp; <i>{timeAgo}</i>
      </span>
    </div>
  );
}

export default TimeAgo;
