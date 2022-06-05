import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviesGrid from "./MoviesGrid";
import { Button } from "reactstrap";
import MovieForm from "./MovieForm";
import Popup from "reactjs-popup";

/**
 * Retrieves all Movies and displays it on the interface using a MoviesGrid
 */
const AllMovies = () => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchItems = async () => {
			const result = await axios(`http://localhost:8080/api/movies`);
			setItems(result.data.movies);
		};
		fetchItems();
	});

	return (
		<div>
			<Popup
				trigger={<Button color="success">Create Movie</Button>}
				position="center"
				modal
				nested
			>
				<MovieForm
					url={`http://localhost:8080/api/movies/`}
					newMovie={true}
				></MovieForm>
			</Popup>
			<MoviesGrid items={items} />;
		</div>
	);
};

export default AllMovies;
