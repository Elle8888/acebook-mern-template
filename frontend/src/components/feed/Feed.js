import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import CreatePost from './createPost/createPost'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const currentUser = window.localStorage.getItem("currentUser");


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
          <br></br>
          <button onClick={logout}>
            Logout {currentUser}
          </button>
          <CreatePost current_user = {currentUser} token={token} /> 
          <div id='feed' role="feed">
            <div id='posts'>
              {posts.slice(0).reverse().map(
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