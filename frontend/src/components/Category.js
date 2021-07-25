import React, {useState} from 'react';
import CardItem from './CardItem';
import Places from './Places';


const Category =({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null)

    const onTitleClick = (index) => {
        setActiveIndex(index);
    }

    const renderedItems = items.map( (item, index) => {
        const active = index === activeIndex ? 'secondary' : ''

        return ( 
        <React.Fragment  key={item.title}>
            <button 
                className = {`ui ${active} button`}
                onClick ={ () => onTitleClick(index) }
            >
                {item.title}
            </button>  
        </React.Fragment>        
        )
        
    });

    
    return (
    <div  >
        {renderedItems}
        <div className='cards__container'>
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    {<Places
                    src='https://www.helmet.fi/download/noname/{C95C4392-6C2F-4182-9182-1D9A0A376117}/87364'
                    text='Open hour: 8-5  Address: dafsdasfghmj'
                    label='Mystery'
                    path='/events'
                    />}

                    {<Places
                    src='https://www.helmet.fi/download/noname/{C95C4392-6C2F-4182-9182-1D9A0A376117}/87364'
                    text='Open hour: 8-5'
                    label='Mystery'
                    path='/events'
                    />}
                    {<Places
                    src='https://www.helmet.fi/download/noname/{C95C4392-6C2F-4182-9182-1D9A0A376117}/87364'
                    text='Open hour: 8-5'
                    label='Mystery'
                    path='/events'
                    />}
                    {<Places
                    src='https://www.helmet.fi/download/noname/{C95C4392-6C2F-4182-9182-1D9A0A376117}/87364'
                    text='Open hour: 8-5'
                    label='Mystery'
                    path='/events'
                    />}
                    {<Places
                    src='https://www.helmet.fi/download/noname/{C95C4392-6C2F-4182-9182-1D9A0A376117}/87364'
                    text='Open hour: 8-5'
                    label='Mystery'
                    path='/events'
                    />}
                </ul>
                <ul className='cards__items'>
                    {<Places
                    src='https://www.helmet.fi/download/noname/{C95C4392-6C2F-4182-9182-1D9A0A376117}/87364'
                    text='Open hour: 8-5'
                    label='Mystery'
                    path='/events'
                    />}

                    {<Places
                    src='https://www.helmet.fi/download/noname/{C95C4392-6C2F-4182-9182-1D9A0A376117}/87364'
                    text='Open hour: 8-5'
                    label='Mystery'
                    path='/events'
                    />}
                    {<Places
                    src='https://www.helmet.fi/download/noname/{C95C4392-6C2F-4182-9182-1D9A0A376117}/87364'
                    text='Open hour: 8-5'
                    label='Mystery'
                    path='/events'
                    />}
                    {<Places
                    src='https://www.helmet.fi/download/noname/{C95C4392-6C2F-4182-9182-1D9A0A376117}/87364'
                    text='Open hour: 8-5'
                    label='Mystery'
                    path='/events'
                    />}
                    {<Places
                    src='https://www.helmet.fi/download/noname/{C95C4392-6C2F-4182-9182-1D9A0A376117}/87364'
                    text='Open hour: 8-5'
                    label='Mystery'
                    path='/events'
                    />}
                </ul>
            </div>        
        </div>
    </div>
        );
}


export default Category;

