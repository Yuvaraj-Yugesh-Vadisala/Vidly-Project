import React from "react";

const Heart = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";

  return (
    <i
      onClick={() => props.onLiked(props.movie)}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="false"
    ></i>
  );
};

export default Heart;
