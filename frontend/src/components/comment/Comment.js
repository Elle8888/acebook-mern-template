import React from "react";

const Comment = ({commentText, postId}) => {

    // all comments in post.js is an array of objects

    // needs ref to postId
    // needs ref to itself
    // needs text

    // when delete, update local state in post.

    return (
    <div>
        <p>{commentText}</p>
    </div>
        )
}

export default Comment