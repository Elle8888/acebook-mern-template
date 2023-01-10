import React from 'react';

const Post = ({post}) => {
  return(
    <article data-cy="post" key={ post._id }>
      <div class="post">
        <h4>{post.author}</h4>
        <p>{post.date}</p>
        <p>{post.message}</p>
        <p>Likes: {post.likes}</p>
        <button>Comments</button>
        <div class="comment">
          
          <p>{post.comments}</p>
        </div>
        
        {/* <img> src={post.profile_picture_url}</img>   Currently breaks the rest if there are no images
        <img> src={post.post_image_url}</img> 
        */}
      </div>
    </article>
  )
}

export default Post;
