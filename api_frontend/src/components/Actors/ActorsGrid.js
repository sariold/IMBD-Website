import ActorItem from "./ActorItem.js";
import React from "react";

/**
 * Grid that displays movies with its actors
 *
 * @param {items} param0 List of movies
 */
const ActorsGrid = ({ items }) => {
	return (
		<section className="cards">
			{items.map((item, index) => (
				<ActorItem key={item._id} item={item} />
			))}
		</section>
	);
};

export default ActorsGrid;
