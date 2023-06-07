
const RatingFilter = ({ratingFilter, handleRatingFilterChange}) => {
    return (
        <div>
            <label >Filter by Rating:</label>
            <select id="filter" value={ratingFilter} onChange={handleRatingFilterChange}>
                <option value="">All</option>
                <option value="1">1star to up</option>
                <option value="2">2start to up</option>
                <option value="3">3star to up</option>
                <option value="4">4star to up</option>
                <option value="5">5star</option>

            </select>
        </div>
    )
}

export default RatingFilter