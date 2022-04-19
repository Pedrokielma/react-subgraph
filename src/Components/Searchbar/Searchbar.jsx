import React, { useState } from 'react';
import './Searchbar.css'
import { FiSearch } from 'react-icons/fi'


function Searchbar(props) {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
    props.search(e.target.value);
  };


  return (
    <div className='searchbar-div'>
    <FiSearch className='serch-icon' />
    <input type="text" placeholder='Search' value={search} onChange={handleChange} />
    </div>
  );
}

export default Searchbar;