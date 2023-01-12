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
  const displayProfile = ( <div className="wrapper">
          <div className="box-forming3">
            <br></br> 
          <div className="box-forming5">
          </div>
          <br></br>
          <br></br>
      
        <div className="box-forming4">
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
          <CreatePost current_user={currentUser} token={token} /> 
          <p>{displayProfile}</p>
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