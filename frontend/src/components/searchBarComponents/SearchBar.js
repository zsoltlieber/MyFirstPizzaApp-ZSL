import React from 'react'

function SearchBar({ setSearchTextChange }) {
  return (
    <div className='serchbar-box'>
      <input
        className='serchbar'
        type='search'
        placeholder='searchbar... - only for test -'
        onChange={setSearchTextChange}
      />
    </div>
  )
}

export default SearchBar