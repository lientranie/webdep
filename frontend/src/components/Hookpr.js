import React from 'react';
import { MyInput } from './MyInput';
import Search from './Search';

const sendbackend = (state) => {
    fetch('/api/v1/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: state.value
        })
    }).then(
        res => res.json()
    ).then(
        data => console.log(data)
    )
}

function Hookpr() {
    
    return (
        <div>
           
           <div className='input-areas'>
                <MyInput onEnter={sendbackend}/>
            </div>

            <div>
                <Search />
            </div>
        </div>


    )
}

export default Hookpr
