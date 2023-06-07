
import React from 'react'

 const SortFilter = ({sortOrder,handleSortChange}) => {
  return (
    <div>
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortOrder} onChange={handleSortChange}>
            <option value="title">Title</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="rating-asc">Rating (Low to High)</option>
            <option value="rating-desc">Rating (High to Low)</option>
          </select>
        </div>
  )
}


export default SortFilter