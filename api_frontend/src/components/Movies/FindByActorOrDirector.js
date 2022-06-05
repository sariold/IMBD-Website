import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviesGrid from "./MoviesGrid.js";

/**
 * Finds all movies by a certain actor/director and displays in the interface
 *
 * We receive the query from the form and forward it to the backend, in the end
 * displaying the results, if there are any.
 */
const FindByActorOrDirector = () => {
	const [query, setQuery] = useState("");
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchItems = async () => {
			const result = await axios(
				`http://localhost:8080/api/movies/findByActorOrDirector/${query}`
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
			<h1> Find movies by actor or director </h1>
			<br />
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					type="text"
					className="form-control"
					placeholder="Search by actor or director"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					autoFocus
				></input>
			</form>
			<MoviesGrid items={items} />
		</section>
	);
};

export default FindByActorOrDirector;
