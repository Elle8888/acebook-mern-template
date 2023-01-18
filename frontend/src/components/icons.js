import React, { useState } from 'react';


export default function Icons({setSelectedFish, openFishSelector}) {
    
    const arr = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'el', 'twe', 'th', 'fo', 'fi', 'si', 'se', 'ei', 'ni', 'tw']

    const chooseFishandClose = (el) => {
        setSelectedFish(`${el}-icon`)
        openFishSelector()
    }

    const allFish = arr.map((el) => <div className={`${el}-icon`} onClick={() => chooseFishandClose(`${el}`)}></div>)

    return ( 
        <div className="icons">
            {allFish}
        </div>
    )
}