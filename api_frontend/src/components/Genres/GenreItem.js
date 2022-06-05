import React from "react";

/**
 * Information that is displayed for a genre request; a movie with its title, list of genres and year.
 * 
 * @param {item} param0 Movie to be displayed
 */
const GenreItem = ({ item }) => {
	return (
		<div className="list">
			<h3>{item.title}</h3>
			<ul>
				<li>
					<strong>Genres:</strong> {item.genre.join(", ")}
				</li>
				<li>
					<strong>Year:</strong> {item.year}
				</li>
			</ul>
		</div>
	);
};

export default GenreItem;
