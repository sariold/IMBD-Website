import GenreItem from "./GenreItem.js";
import React from "react";

/**
 * Grid where genres are displayed (by listing movies with their genres)
 *
 * @param {items} param0 List of movies of which the genres are to be displayed
 */
const GenreGrid = ({ items }) => {
	return (
		<section className="cards">
			{items.map((item, index) => (
				<GenreItem key={item._id} item={item} />
			))}
		</section>
	);
};

export default GenreGrid;
