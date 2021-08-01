import React from 'react';
const Category =({ items, clickedItem, setClickedItem }) => {
    const renderedItems = items.map( (item) => {
        const active = item === clickedItem ? 'primary' : ''
        return ( 
        <React.Fragment  key={item}>
            <button 
                className = {`compact ui ${active} button`}
                onClick ={ () => setClickedItem(item) }
            >
                {item}
            </button>  
        </React.Fragment>        
        )
    });    
    return (
    <div  >
        {renderedItems}        
    </div>
    
        );
}


export default Category;

