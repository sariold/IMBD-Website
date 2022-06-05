import React, { useState, useEffect } from "react";
import axios from "axios";
import GenreGrid from "./GenreGrid.js";

/**
 * Handles the request of finding genres by actor/director;
 * displays a GenreGrid
 */
const FindGenreByActorOrDirector = () => {
	const [query, setQuery] = useState(" ");
	const [sort, setSort] = useState("1");
	const [sortButton, setSortButton] = useState("ascending");
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchItems = async () => {
			const result = await axios(
				`http://localhost:8080/api/movies/genres/findByActorOrDirector/${query}/${sort}`
			);
			if (!!result.data.movies) {
				setItems(result.data.movies);
				console.log(result.data.movies);
			} else {
				setItems([]);
			}
		};
		fetchItems();
	}, [query, sort]);

	const changeButton = () => {
		setSort(sort * -1);
		console.log(sort);
		if (sort === 1) setSortButton("ascending");
		else setSortButton("descending");
	};

	return (
		<section>
			<h1> Genres by actor or director name </h1>
			<br />
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				s
			>
				<input
					type="text"
					className="form-control"
					placeholder="Genres by actor or director"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					autoFocus
				></input>
			</form>
			<br />
			<button
				className="btn btn-primary btn-"
				onClick={(e) => changeButton()}
			>
				{" "}
				{sortButton}
			</button>
			<h1 className="center"> {query} </h1>
			<GenreGrid items={items} />
		</section>
	);
};

export default FindGenreByActorOrDirector;
