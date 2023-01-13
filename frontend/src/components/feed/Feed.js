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
  const displayProfile = (
    <div className="wrapper">
          <div className="profile-white-box">
            <br></br> 
          <div className="profile-picture">
          </div>
          <br></br>
          <br></br>
      
        <div className="username-box">
          <br></br> 
         <div className="overlays-username">
              <h2>{currentUser}</h2>
            </div>   
      {/* <div className="inputs">
        <input placeholder="Status update" type="text" />
      </div> */}
      {/* <button role="submit-button" id="submit" type="submit" value="submit">Post status</button>
      <div className="user-update">
      <p>{}</p>
    </div> */}
    </div>
  </div>
</div>
)
    if(token) {
      return(
        <>
          <br></br>
          <div className='whole-page'>
            <div id='feed' role="feed">
              <div id='posts'>
              {posts.slice(0).reverse().map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
              </div>
            </div>
            <div className='whole-profile'>
              <div>{displayProfile}</div>
              <CreatePost current_user={currentUser} token={token} /> 
             </div> 
          </div>
        </>
      )
    } else {
      navigate('/signin')
    }
}
// make sure the whole page is 100% width and 100vh
// display flex
// 

export default Feed;