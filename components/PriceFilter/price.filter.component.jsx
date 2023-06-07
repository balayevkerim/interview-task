import React from 'react'

 const PriceFilter = ({priceFilterValue,handlePriceFilterChange}) => {
  return (
    <div>
          <label>Filter by Price:</label>
          <select id="filter" value={priceFilterValue} onChange={handlePriceFilterChange}>
            <option value="">All</option>
            <option value="300">Up to 300$</option>
            <option value="500">Up to 500$</option>
            <option value="500"> Over 500$</option>
          </select>
        </div>
  )
}


export default PriceFilter