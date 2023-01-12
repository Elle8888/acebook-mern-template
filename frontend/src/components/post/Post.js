import React from 'react';
import {useState} from 'react'
import Comment from '../comment/Comment'
import './Post.css';

const Post = ({post}) => {

  const [toggleComments, setToggleComments] = useState(false)
  const [toggleCommentBox, setToggleCommentBox] = useState(false)
  const [comment, setComment] = useState("")
  const [allComments, setAllComments] = useState(post.comments)
  console.log('ALL COMMENTS', allComments)

  const commentsToggler = () => {
    setToggleComments((toggleComments) => !toggleComments)
    // console.log(commentsDisplay)
  }

  const commentBoxToggler = () => {
    console.log('clikcec')
    setToggleCommentBox((toggleCommentBox) => !toggleCommentBox)

  }

  const handleInput = (e) => {
    setComment(e.target.value)
  }

  const updateCommentsArray = () => {
    setAllComments((allComments) => [...allComments, comment])
  }

  // const commentsDisplay = post.comments?.map((commentText) => <Comment commentText={commentText} />)
  // const commentsDisplay = allComments.map((commentText) => <Comment commentText={commentText} />)

  const commentsDis = allComments.map((comment) => <Comment commentText={comment} />)

  // console.log('test map', commentsDis)

  // console.log('COMMENT COMPONENT', <Comment commentText='test' />)
  // console.log('THIS IS COMMENTS DISPLAY', console.log(commentsDisplay))
  return (
    <div className="box-forming">
      <br></br>
      <div className="overlay">
          <article data-cy="post" key={ post._id }>
            <div className="post-box">
            <h3>{post.author}</h3>
            <div className="post-date">
              <p>{post.date}</p>
            </div>
            <div className="post-content">
              <p>{post.message}</p>
              <button role="like button" type="submit">Like</button> 
              <p>{post.likes}</p>
              <button onClick={commentsToggler} data-cy="toggle-btn" id='submit' role='submit-button'>Comments</button>
              <div className="comment">
                {toggleComments && commentsDis}
              </div>
              <button onClick={commentBoxToggler}>add comment</button>

              {toggleCommentBox && (<div className='add-comment'>
            <textarea className='add-comment-textbox' onChange={handleInput} value={comment}></textarea>
            <button onClick={updateCommentsArray}>post</button>
          </div>)}

            </div>          
            </div>
          </article>
        </div>
    </div>
  )
}

export default Post;
