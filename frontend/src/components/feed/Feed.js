import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import CreatePost from './createPost/createPost'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const currentUser = window.localStorage.getItem("currentUser"); // set on login
  let token = window.localStorage.getItem("token"); // set on login


  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          console.log('THIS IS DATA FROM FETCH IN FEED', data)
          window.localStorage.setItem("token", data.token)
          token = data.token;
          console.log('TOKEN UPDATED:', data.token)
          setPosts(data.posts);
        })
    }
  }, [])

  console.log('POSTS RENDERED FROM FEED', posts)


  const logout = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("currentUser")
    navigate('/login')
  }
  
    if(token) {
      return(
        <>
          <br></br>
          <CreatePost current_user = {currentUser} token={token} /> 
          <div id='feed' role="feed">
            <div id='posts'>
              {posts?.slice(0).reverse().map(
                (post) => ( <Post post={ post } key={ post._id } current_user = {currentUser} /*token={token}*/ /> )
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