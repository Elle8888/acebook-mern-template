import React, { useState } from 'react';


export default function Icons({setSelectedFish, openFishSelector, currentUserID}) {
  const currentUser = window.localStorage.getItem("currentUser"); // set on login
    
    const arr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'el', 'twe', 'th', 'fo', 'fi', 'si', 'se', 'ei', 'ni', 'tw']

    const chooseFishandClose = (el) => {
        setSelectedFish(`${el}-icon`)
        sendUpdatedProfilePicture(el)
        openFishSelector()
    }


      
    const sendUpdatedProfilePicture = async(icon) => {
        console.log("UPDATING TO ICON:", icon)
        console.log("ON ACCOUNT ID:", currentUserID)
        let response = await fetch('/users/updateProfilePicture', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: currentUser, new_picture: icon })
        })
      
        if (response.status !== 200) {
          console.log("post failed, Error status:" + response.status)
        } else {
          console.log("oop: " + response.status)
          let data = await response.json()
          console.log("UPDATED PROFILE:", data)
        }
      }

    const allFish = arr.map((el) => <div className={`${el}-icon`} onClick={() => chooseFishandClose(`${el}`)}></div>)

    return ( 
        <div className="icons">
            {allFish}
        </div>
    )
}