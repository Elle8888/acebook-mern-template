import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import Icons from '../icons';
import CreatePost from './createPost/createPost'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const currentUser = window.localStorage.getItem("currentUser"); // set on login
  let token = window.localStorage.getItem("token"); // set on login

  const [selectedFish, setSelectedFish] = useState('')
  const [fishSelectorisVisible, setFishSelectorIsVisible] = useState(false)
  const [pic, setPic] = useState()
  let currentUserID = ''

console.log("FISH", selectedFish)

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
          token = data.token;
          setPosts(data.posts);
        })
    }
  }, [])

  const getUser = async(req) => {
    console.log("SEARCHING:" , `/users/profile/${currentUser}` )
    fetch(`/users/profile/${currentUser}`, {
          })
            .then(response => response.json())
            .then(async data => {
              currentUserID = data[0]._id
              console.log("USER FOUND: ", data)
              console.log("PICTURE: ", data[0].picture)
              console.log("USER ID: ", currentUserID)
              setPic(data[0].picture)
              console.log("PROFILE PIC:", pic)

            })
  }

  getUser();


  const openFishSelector = () => {
    setFishSelectorIsVisible((prev) => !prev)
    console.log(fishSelectorisVisible)
    getUser()
  }

  
  const displayProfile = (
    <div className="wrapper profile-wrapper">
          <div className="profile-white-box">

            <br></br> 
          <div onClick={openFishSelector} className={`${pic}-icon fish-picture`}>
          </div>
      
        <div className="username-box">
              <h2>{currentUser}</h2>
            </div>   
  </div>
</div>
)
    if(token) {
      return(
        <>
          <br></br>

          <div className='whole-page'>
            {fishSelectorisVisible && <Icons setSelectedFish={setSelectedFish} openFishSelector={openFishSelector} currentUserID={currentUserID}/>}
            {/* <div id='feed' role="feed"> */}
              <div id='posts' className='posts' data-cy="post">
              {posts?.slice(0).reverse().map(
                (post) => ( <Post post={ post } key={ post._id } current_user = {currentUser} setPosts={setPosts} /*token={token}*/ /> )

              )}
              </div>
            {/* </div> */}
            <div className='whole-profile'>
              {displayProfile}
              <CreatePost current_user={currentUser} token={token} setPosts={setPosts}/> 
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