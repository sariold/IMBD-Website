import React from 'react';
import InfoItem from './InfoItem'

/**
 * Grid that displays InfoItems for querying all information a movie
 * 
 * @param {movies} param0 all movies in the response according to current query
 */
const InfoGrid = ({movies}) => {
    return (
        <section className="cards">
            { movies.map((movie) => (
                <InfoItem key={movie._id} movie={movie} />
            ))}
        </section>
    )
}

export default InfoGrid;
