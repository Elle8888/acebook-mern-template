import React from 'react';
import {useState} from 'react'
import Comment from '../comment/Comment'
import './Post.css';

const Post = ({post}) => {

  const [toggleComments, setToggleComments] = useState(false)
  const [toggleCommentBox, setToggleCommentBox] = useState(false)
  const [comment, setComment] = useState("")
  const [allComments, setAllComments] = useState(post.comments)
  const [commentData, setCommentData] = useState({
    comments: post.comments,
    postId: post._id
  })

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

  const commentsDis = allComments.map((comment) => <Comment commentText={comment} />)

  const commentDataDisplay = commentData.comments.map((comment, i) => <Comment commentText={comment} postId={commentData.postId}/>)

  return (
    <div className="box-forming">
      {/* <div className="overlay"> */}
          {/* <article data-cy="post" key={ post._id }> */}
            <div className="post-box">
              <div className='post-headings'>
            <h3 className='post-author'>{post.author}</h3>
              <p className='post-date'>{post.date}</p>
              </div>
            <div className="post-content">
              <p>{post.message}</p>
              <div className='below-post-text'>
              <button onClick={commentsToggler} data-cy="toggle-btn" id='submit' role='submit-button'>Comments</button>
              <div className='likes-container'>
                <button role="like button" type="submit">Like</button> 
                <p>{post.likes}</p>
              </div>
              </div>
              <div className="comment">
                {/* {toggleComments && commentsDis} */}
                {toggleComments && commentDataDisplay}

              </div>
              <button onClick={commentBoxToggler}>add comment</button>
              {toggleCommentBox && (<div className='add-comment'>
            <textarea className='add-comment-textbox' onChange={handleInput} value={comment}></textarea>
            <button onClick={updateCommentsArray}>post</button>
          </div>)}
            </div>          
            </div>
          {/* </article> */}
        {/* </div> */}
    </div>
  )
}

export default Post;
