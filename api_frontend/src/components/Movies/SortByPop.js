import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviesGrid from "./MoviesGrid.js";

/**
 * Sort movies by their popularity/users_rating
 * with the possibility of limiting the response to a number of movies.
 * (returns a MovieGrid containing all the movies)
 */
const SortByPop = () => {
	const [query, setQuery] = useState("");
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchItems = async () => {
			const result = await axios(
				`http://localhost:8080/api/movies/sortByPopularity`,
				{
					params: {
						limit: query,
					},
				}
			);

			if (!!result.data.movies) {
				setItems(result.data.movies);
				console.log(result.data.movies);
			} else {
				setItems([]);
			}
		};

		fetchItems();
	}, [query]);

	return (
		<section>
			<h1> Movies ranked by popularity </h1>
			<br />
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					type="text"
					className="form-control"
					placeholder="Limit the number of movies"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					autoFocus
				></input>
			</form>
			<br />
			<MoviesGrid items={items} />
		</section>
	);
};

export default SortByPop;
