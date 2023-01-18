import React, { useState } from "react";

const EditButton = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const token = window.localStorage.getItem("token");
    const [title, setTitle] = useState(props.post.title);
    const [content, setContent] = useState(props.post.content);


    const handleEdit = async (updatedPost) => {
        console.log("this is the id", props.post._id);
        const handleEdit = async () => {
        let response = await fetch(`/posts/${props.post._id}`, {
          method: 'put',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: title, content: content })
        });


        if (response.status !== 200) {
          console.log("post failed, Error status:" + response.status)
        } else {
          console.log("oop: " + response.status)
          let data = await response.json()
          console.log(data)
        }
    }


    const handleClick = () => {
      setIsEditing(!isEditing);
    };

    if(isEditing){
        return (
            <div>
                <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
                <button onClick={handleEdit}>Save</button>
                <button onClick={handleClick}>Cancel</button>
            </div>
        );
    }else{
        return (
            <button className={ `edit-button` } onClick={ handleClick }>Edit</button>
        );
    }
  };
};
export default EditButton;
