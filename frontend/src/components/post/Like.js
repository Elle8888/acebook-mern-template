import React, { useState } from "react";

const LikeButton = (props) => {
    const [likes, setLikes] = useState(props.post.likes);
    const [isClicked, setIsClicked] = useState(false);
    const token = window.localStorage.getItem("token")

    const sendLike = async (likeValue) => {
        console.log("this is the id", props.post._id);
        let response = await fetch('/posts/like', {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ post_id: props.post._id, like: likeValue })
        })
      
        if (response.status !== 200) {
          console.log("post failed, Error status:" + response.status)
        } else {
          console.log("oop: " + response.status)
          let data = await response.json()
          console.log(data)
        //   window.localStorage.setItem("token", data.token)
        }
    }

    const handleClick = () => {
      if (isClicked) {
        setLikes(likes - 1);
        sendLike(-1);
      } else {
        setLikes(likes + 1);
        
        sendLike(+1);
      }
      setIsClicked(!isClicked);
    };
  
    return (
      <button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }>
        <img className= "likes-button" src="https://www.clipartmax.com/png/small/179-1790678_fish-heart-food-cat-pet-cat.png" alt="Fish Heart Food Cat Pet - Cat @clipartmax.com"></img>
        <span className="likes-counter">{ `${likes}` }</span>
      </button>
    );
  };
  
  export default LikeButton;