import React, { useEffect, useState } from 'react';
import Post from '../post/Post'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

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
  const createPost = () => {
    //  navigate('/post')
    console.log("create post")
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