import React, {useState } from 'react';

const CreatePost = (props) => {
  const [newPostMessage, setNewPostMessage] = useState("");
  const [toggleNewPost, setToggleNewPost] = useState("");

  const handleNewPostMessageChange = (event) => {
    setNewPostMessage(event.target.value)
  }

  const openNewPostField = () => {
    setToggleNewPost((toggleNewPost) => !toggleNewPost)
  }

  const sendPost = async (event) => {

      event.preventDefault();
      let current_date = new Date().toLocaleString();
    
      let response = await fetch( '/posts', {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({author: props.current_user, message: newPostMessage, date: current_date, comments: [], likes: 0}) 
      })
  
      if(response.status !== 201) {
        console.log("post failed, Error status:" + response.status)
      } else {
        console.log("oop: " + response.status)
        let data = await response.json()
        window.localStorage.setItem("token", data.token)
        //This refreshes the page, there may be a nicer way of doing it 
        window.location.reload(false);  
      }
    }

  const newPostField =
   (<div className="on-mind">
      <h3>New post</h3>
      <input placeholder='Post content...' id="message" type='text' value={ newPostMessage } onChange={handleNewPostMessageChange}/>
      <button id="submit-post" onClick={sendPost}> Post</button> 
    </div> )
    
  return (
  <div>
    <button id="create-post" onClick={openNewPostField}>
      Create post
    </button>
    <div>{toggleNewPost && newPostField }</div>
  </div>)
}

export default CreatePost