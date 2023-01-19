import React from "react";

const Comment = ({comment, postId}) => {

    // when delete, update local state in post.
    return (
    <div class="comment-box">
        <p>{comment.author}</p>
        <p>{comment.date}</p>
        <p>{comment.text}</p>
       
    </div>
        )
}

export default Comment