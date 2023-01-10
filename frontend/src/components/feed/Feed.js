import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newPostMessage, setNewPostMessage] = useState("");

  const current_user = window.localStorage.getItem("currentUser");

  const createPost = async (event) => {
    console.log("Create post")
    event.preventDefault();
    let current_date = new Date().toLocaleString();

    let response = await fetch( '/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({author: current_user, message: newPostMessage, date: current_date, comments: [], likes: 0}) 
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

  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        })
    }
  }, [])

  function toggleText() {
    console.log("toggle")
    var text = document.getElementById("new_post");
    if (text.style.display === "none") {
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
  }

  const handleNewPostMessageChange = (event) => {
    setNewPostMessage(event.target.value)
  }
    

  const logout = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("currentUser")
    navigate('/login')
  }
  
    if(token) {
      return(
        <>
          
          <h2>Posts</h2>
          <button onClick={logout}>
            Logout {current_user}
          </button>
          <button id="create-post" onClick={toggleText}>
            Create post
          </button>
          <div id='feed' role="feed">
          <div id='new_post'>
              <h3>New post</h3>
              <input placeholder='Post content...' id="message" type='text' value={ newPostMessage } onChange={handleNewPostMessageChange}/>
              <button id="submit-post" onClick={createPost}>
                Post
              </button>
            </div>

            <div id='posts'>
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
              </div>
          </div>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;