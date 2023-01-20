import React from "react";

const Comment = ({comment, postId}) => {

    // when delete, update local state in post.
    return (
    <div class="comment-box">
        <p classname="comment-author">{comment.author}</p>
        <p classname="comment-date">{comment.date}</p>
        <p classname="comment-text">{comment.text}</p>
       
    </div>
        )
}

export default Comment