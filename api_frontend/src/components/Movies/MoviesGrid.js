import MovieItem from './MovieItem'
import React from 'react';

/**
 * The grid where the MovieItems are displayed.
 */
const MoviesGrid = ({items}) => {

    return (
        <section className="cards">
            { items.map((item) => (
                <MovieItem key={item._id} item = {item}/>
            ))}
        </section>
    )
}

export default MoviesGrid
