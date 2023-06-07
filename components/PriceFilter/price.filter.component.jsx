import React from 'react'
import FormInput from '../InputField/input.component'

 const PriceFilter = ({selectedMinPrice,selectedMaxPrice,setSelectedMinPrice,setSelectedMaxPrice}) => {
  
  const handleChange =(e) =>{

  }
  return (
    <div className='price-container'>
      <label className='labelPrice'>Filter by Price:</label>
      <FormInput
          label='Minimum price'
          type='text'
          onChange={(e)=>setSelectedMinPrice(e.target.value)}
          value={selectedMinPrice}
        />
        <FormInput
          label='Maximum price'
          type='text'
          onChange={(e)=>setSelectedMaxPrice(e.target.value)}
          value={selectedMaxPrice}
        />
          {/* <label>Filter by Price:</label>
          <select id="filter" value={priceFilterValue} onChange={handlePriceFilterChange}>
            <option value="">All</option>
            <option value="300">Up to 300$</option>
            <option value="500">Up to 500$</option>
            <option value="500"> Over 500$</option>
          </select> */}
        </div>
  )
}


export default PriceFilter