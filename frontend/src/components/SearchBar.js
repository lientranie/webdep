import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const SearchBar = () => {
  const [search, setSearch] = useState(``);
  const [list, setList] = useState([
    'Go to the store',
    'Wash the dishes',
    'Learn some code',
  ]);

  const addItem = e => {
    e.preventDefault();
    const item = e.target.newItem.value;
    if (item) setList([...list, item]);
    e.target.reset();
  };

  const handleDelete = item => {
    setList(list.filter(li => li !== item));
  };

  return (
    <div className='content'>
      <div className='container'>
        <section className='section'>
          <input
            type='text'
            className='input'
            onChange={e => setSearch(e.target.value)}
            placeholder='Search...'
          />
          <ul>
            {list
              .filter(li => li.toLowerCase().includes(search.toLowerCase()))
              .map((item, key) => (
                <li key={key}>
                  {item}{' '}
                  <span className='delete' onClick={() => handleDelete(item)} />
                </li>
              ))}
          </ul>
        </section>
        <hr />
        <section className='section'>
          <form className='form' onSubmit={e => addItem(e)}>
            <label htmlFor='newItem'>Task:</label>
            <input
              type='text'
              className='input'
              name='newItem'
              id='newItem'
              placeholder='Something that needs to be done...'
            />
            <button className='button is-info'>Add Item</button>
          </form>
        </section>
      </div>
    </div>
  );
};


export default SearchBar