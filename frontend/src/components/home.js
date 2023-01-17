import React, { useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

export default function Home() {
    return (
        <div>
        
            <body>
            <main>
            <div>
                <img
                src="fish.png" alt="fish"
                className="rotate" width="20%"
                height="20%" />
                        <br></br>  
                        <br></br>        
                        <br></br>
                        <br></br>
                <img
                    src="github.png" alt="git"
                    width="2%" height="2%" position="center"
                        />
                        <br></br>
                <Link id="posts-link-nav" to="/creators">
                Creators
                </Link>
                </div>
            </main>
        </body>   
        </div>
    )
}