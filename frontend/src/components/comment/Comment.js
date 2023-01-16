import React from "react";

const Comment = ({comment, postId}) => {

    // all comments in post.js is an array of objects

    // needs ref to postId
    // needs ref to itself
    // needs text

    // when delete, update local state in post.

    return (
    <div>
        <p>{comment.author}</p>
        <p>{comment.text}</p>
        <p>{comment.date}</p>
    </div>
        )
}

export default Comment