
const BrandFilter = ({ brandOptions, filterValue, handleFilterChange }) => {
  return (
    <div>
      <label >Filter by Brand:</label>
      <select id="filter" value={filterValue} onChange={handleFilterChange}>
        <option value="">All</option>

        {brandOptions && brandOptions.map(brand => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>
    </div>
  )
}


export default BrandFilter