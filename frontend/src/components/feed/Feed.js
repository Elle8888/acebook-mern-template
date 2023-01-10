import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

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
      body: JSON.stringify({author: "Harry", message: "test", date: current_date, comments: [], likes: 0}) 
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
    

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  
    if(token) {
      return(
        <>
          <h2>Posts</h2>
            <button onClick={logout}>
              Logout
            </button>
            <button id="create-post" onClick={createPost}>
              Create post
            </button>
          <div id='feed' role="feed">
              {posts.slice(0).reverse().map(
                (post) => ( <Post post={ post } key={ post._id }/> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;