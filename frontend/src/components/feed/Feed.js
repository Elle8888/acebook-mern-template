import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import NewPost from './createPost/createPost'

const Feed = ({ navigate, currentUser }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const current_user = window.localStorage.getItem("currentUser");

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
          <div id='feed' role="feed">
            <NewPost current_user = {current_user} token={token} /> 
              {posts.slice(0).reverse().map(
                (post) => ( <Post post={ post } key={ post._id }/> )
              )}
          </div>
        </>
      )
    } else {
      navigate('/signup')
    }
}

export default Feed;