
const RatingFilter = ({ratingFilter, handleRatingFilterChange}) => {
    return (
        <div>
            <label >Filter by Rating:</label>
            <select id="filter" value={ratingFilter} onChange={handleRatingFilterChange}>
                <option value="">All</option>
                <option value="1">1star </option>
                <option value="2">2start </option>
                <option value="3">3star </option>
                <option value="4">4star</option>
                <option value="5">5star</option>

            </select>
        </div>
    )
}

export default RatingFilter