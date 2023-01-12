import React from 'react';
import currentUser from '../feed/Feed.js'



const Post = ({ post }) => {

  return (
    <div className="wrapper">
      <div className="box-forming2">
        <br></br>
        <div className="overlay">
          <article data-cy="post" key={post._id}>
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
            </div>
          </article>
        </div>
      </div>
    </div>
  )
  {/* <div className="box-forming3">
        <br></br> 
          <div className="box-forming5">
        </div>
        <br></br>
        <br></br>
        <div className="box-forming4">
          <br></br>
         <div className="overlays-username">
              <h2>{post.author}</h2>
            </div>  
      <div className="inputs">
        <input placeholder="Status update" type="text" />
      </div>
      <button role="submit-button" id="submit" type="submit" value="submit">Post status</button>
      <div className="user-update">
      <p>{post.update}</p>
          </div>
      </div>
      </div>
      </div> */}
      
}   

export default Post;
