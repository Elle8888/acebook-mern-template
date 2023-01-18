import React from 'react';
import {useState, useEffect} from 'react'
import Comment from '../comment/Comment'
import './Post.css';
import LikeButton from './Like'

const Post = (props) => {

  const [toggleComments, setToggleComments] = useState(false)
  const [toggleCommentBox, setToggleCommentBox] = useState(false)
  const [comment, setComment] = useState("")
  const [allComments, setAllComments] = useState(props.post.comments)
  const token = window.localStorage.getItem("token");

  console.log('PROPS IN POST', props)


  //   useEffect(() => {
  //     //Getting the comments for each post
  //   if(token) {
  //     fetch(`/posts/comments/${props.post._id}`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       },
  //     })
  //       .then(response => response.json())
  //       .then(async data => {
  //         setAllComments(data);

  //       })
  //   }
  // }, [])

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
    setAllComments([...allComments, comment]);
    sendComment();
    setComment('')
  }
  
  const sendComment = async() => {
    let current_date = new Date().toLocaleString();
    
    let response = await fetch('/posts/comment', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post_id: props.post._id, text: comment, author: props.current_user, date: current_date})
    })
  
    if (response.status !== 200) {
      console.log("post failed, Error status:" + response.status)
    } else {
      console.log("oop: " + response.status)
      let data = await response.json()
      setAllComments((prevComments) => [...prevComments, data])
    }
  }

  const deleteComment = async() => {
    let response = await fetch('posts/delete', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id: props.post._id})
    })

      if (response.status !== 200) {
        console.log("post failed, Error status:" + response.status)
      } else {
        console.log("oop: " + response.status)
        let data = await response.json()
        console.log('THIS IS RETURNED DATA', data)
        props.setPosts(data)
      }
  }

  const commentDataDisplay = allComments?.map((commentObj) => < Comment comment={commentObj} key={commentObj._id} />)
  // const commentDataDi = allComments?.map((commentObj) => < Comment comment={commentObj} key={commentObj._id} />)

  return (
    // <div className="box-forming">

<div className="wrapper">
      <div className="feed-box">
        <br></br>
        <div className="overlay">

            <div className="post-box">
              <div className='post-headings'>
            <h3 className='post-author'>{props.post.author}</h3>
              <p className='post-date'>{props.post.date}</p>
              </div>
            <div className="post-content">
              <p>{props.post.message}</p>
              <div className='below-post-text'>
                {props.post.author === props.current_user && <button onClick={deleteComment}>delete</button>}
              <button onClick={commentsToggler} data-cy="toggle-btn" className= "toggle-comment-box" id='submit' role='submit-button'>
              <img className= "comments-toggler" src="https://simg.nicepng.com/png/small/119-1196219_ic-comment-comments-comments-icon-transparent.png" alt="Comments"></img>
            </button>
              <div className='likes-container'>
               
                <LikeButton post={props.post}  />
              </div>
              </div>
              <div className="comment">
                {toggleComments && commentDataDisplay}
              </div>
              <button onClick={commentBoxToggler}>add comment</button>
              {toggleCommentBox && (<div className='add-comment'>
            <textarea className='add-comment-textbox' onChange={handleInput} value={comment}></textarea>
            <button onClick={updateCommentsArray}>post</button>
          </div>)}
            </div>          
            </div>

            </div>
            </div>
            {/* </div> */}
    </div>
  )
}

export default Post;
