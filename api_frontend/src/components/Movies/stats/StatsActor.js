import React, { useState } from "react";
import axios from "axios";
import StatsGrid from "./StatsGrid";

/**
 * Retrieves statistics from a certain actor using a StatsGrid
 */
const StatsActor = () => {
	const [query, setQuery] = useState("");
	const [items, setItems] = useState([]);

	const fetchItem = async () => {
		const result = await axios(
			`http://localhost:8080/api/movies/statistics/${query}`
		);
		if (!!result.data.movies) {
			setItems(result.data);
			console.log(result.data);
		} else {
			setItems([]);
		}
	};

	return (
		<section className="search">
			<h1> Users rating statistics of an actor </h1>
			<br />
			<form
				onSubmit={(e) => {
					fetchItem();
					e.preventDefault();
				}}
			>
				<input
					type="text"
					className="form-control"
					placeholder="Search by actor name"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					autoFocus
				></input>
			</form>
			<br />
			{items && <h4 className="center">{query} </h4>}
			<StatsGrid stats={items} />
		</section>
	);
};

export default StatsActor;
