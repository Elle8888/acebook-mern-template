import React from 'react';
import { useState } from 'react'
import Comment from '../comment/Comment'

const Post = ({post}) => {

  const [toggleComments, setToggleComments] = useState(false)

  const commentsToggler = () => {
    setToggleComments((toggleComments) => !toggleComments)
  }

  const commentsDisplay = post.comments?.map((commentText) => <Comment commentText={commentText} />)

  return(
    <article data-cy="post" key={ post._id }>
      <div class="post">
        <h4>{post.author}</h4>
        <p>{post.date}</p>
        <p>{post.message}</p>
        <p>Likes: {post.likes}</p>
        <button onClick={commentsToggler} data-cy="toggle-btn">Comments</button>
        <div class="comment">
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
