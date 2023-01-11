import React from 'react';
import './Post.css';

const Post = ({post}) => {
  return (
    <div className="box-forming">
      <br></br>
      <div className="overlay">
        
          <article data-cy="post" key={ post._id }>
            <div className="post-box">
            <h3>{post.author}</h3>
            <div className="post-date">
              <p>{post.date}</p>
            </div>
            <div className="post-content">
              <p>{post.message}</p>
              <button role="like button" type="submit">Like</button> 
              <p>{post.likes}</p>
              <div className="inputs">
                <input placeholder="Comment" type="text" />
              </div>
              <button role='submit-button' id='submit' type='submit' value='Submit'>Comments</button>
              <div className="comment">
                <p>{post.comments}</p>
              </div>
            </div>
              
              {/* <img> src={post.profile_picture_url}</img>   Currently breaks the rest if there are no images
              <img> src={post.post_image_url}</img> 
              */}
            
            </div>
          </article>
        </div>
    </div>
  )
}

export default Post;
