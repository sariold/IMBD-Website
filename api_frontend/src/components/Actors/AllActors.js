import React, { useState, useEffect } from "react";
import axios from "axios";
import ActorsGrid from "./ActorsGrid.js";

/**
 * Handles the request of displaying all actors;
 * displays an ActorsGrid
 */
const AllActors = () => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchItems = async () => {
			const result = await axios(
				`http://localhost:8080/api/movies/findAllActors`
			);
			setItems(result.data.movies);
		};
		fetchItems();
	});

	return <ActorsGrid items={items} />;
};

export default AllActors;
