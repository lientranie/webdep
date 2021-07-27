import React, { useState, useEffect } from 'react';



const GetData = () =>{
    const [currentTime, setCurrentTime] = useState([]);

    useEffect(() => {
        fetch('/time').then(res => res.json()).then(data => {
            setCurrentTime(data.id);
        })
    }, [])

    
    return (
        <div>
           <p>Data from backend is {currentTime}</p>
        </div>
    )
}

export default GetData
