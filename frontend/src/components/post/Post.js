import React from 'react';
import { useState } from 'react'
import Comment from '../comment/Comment'

const Post = ({post}) => {

  const [toggleComments, setToggleComments] = useState(false)
  const [toggleCommentBox, setToggleCommentBox] = useState(false)
  const [comment, setComment] = useState("")
  const [allComments, setAllComments] = useState(post.comments)

  const commentsToggler = () => {
    setToggleComments((toggleComments) => !toggleComments)
  }

  const commentBoxToggler = () => {
    setToggleCommentBox((toggleCommentBox) => !toggleCommentBox)
  }

  const handleInput = (e) => {
    setComment(e.target.value)
  }

  const updateCommentsArray = () => {
    setAllComments((allComments) => [...allComments, comment])
  }

  // const commentsDisplay = post.comments?.map((commentText) => <Comment commentText={commentText} />)
  const commentsDisplay = allComments?.map((commentText) => <Comment commentText={commentText} />)

  // if add comment is visible..

  return(
    <article data-cy="post" key={ post._id }>
      <div className="post">
        <h4>{post.author}</h4>
        <p>{post.date}</p>
        <p>{post.message}</p>
        <p>Likes: {post.likes}</p>
        <button onClick={commentsToggler} data-cy="toggle-btn">Comments</button>
        <button onClick={commentBoxToggler} data-cy="toggle-btn">Add comment</button>
        <div class="comment">
          {toggleCommentBox && (<div className='add-comment'>
            <textarea className='add-comment-textbox' onChange={handleInput} value={comment}></textarea>
            <button onClick={updateCommentsArray}>post</button>
          </div>)}
          <div>{toggleComments && commentsDisplay}</div>
        </div>
        
        {/* <img> src={post.profile_picture_url}</img>   Currently breaks the rest if there are no images
        <img> src={post.post_image_url}</img> 
        */}
      </div>
    </article>
  )
}

export default Post;
