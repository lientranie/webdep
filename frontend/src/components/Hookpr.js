import React from 'react';
import { Button } from './Button';



function Hookpr() {
    const [counter, setCounter] = React.useState(0)
    const inc =() => {setCounter(counter +1); }

    const dec =() => {setCounter(counter -1); }


    return (
        <div>
           <h1>The state Hook</h1> 
           <p>Counter: {counter} </p>
           <button onClick={inc}>+1  </button>
           <button onClick={dec}>-1</button>

           <div className='input-areas'>
            <form>
                <input
                className='footer-input'
                name='search'
                type='text'
                placeholder='Search for event'
                />
            </form>
            </div>
        </div>
    )
}

export default Hookpr
