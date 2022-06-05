import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoGrid from "./InfoGrid";

/**
 * Retrieves a movie using either title or IMDb url
 * fetchItems retrieves the movie from the backend if it exists,
 * and places an InfoGrid that will display the movie(s)
 */
const InfoMovies = () => {
	const [query, setQuery] = useState("");
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchItems = async () => {
			const result = await axios(
				`http://localhost:8080/api/movies/info/${query}`
			);
			if (!!result.data.movie) {
				setItems(result.data.movie);
				console.log(result.data.movie);
			} else {
				setItems([]);
			}
		};
		fetchItems();
	}, [query]);

	return (
		<section>
			<h1> Movie by title or IMDb url </h1>
			<br />
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					type="text"
					className="form-control"
					placeholder="Search by title or IMDb URL"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					autoFocus
				></input>
			</form>
			<InfoGrid movies={items} />
		</section>
	);
};

export default InfoMovies;
