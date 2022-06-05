import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Paper } from "@material-ui/core";

const MovieForm = ({ url, newMovie }) => {
	const [movieData, setMovieData] = useState({
		title: "",
		rating: "",
		year: "",
		users_rating: "",
		votes: "",
		metascore: "",
		img_url: "",
		countries: "",
		languages: "",
		actors: "",
		genre: "",
		tagline: "",
		description: "",
		directors: "",
		runtime: "",
		imdb_url: "",
	});

	const fetchItems = async () => {
		const result = await axios(url);
		const movie = result.data.movie;
		setMovieData({
			title: movie.title,
			rating: movie.rating,
			year: movie.year,
			users_rating: movie.users_rating,
			votes: movie.votes,
			metascore: movie.metascore,
			img_url: movie.img_url,
			countries: movie.countries,
			languages: movie.languages,
			actors: movie.actors,
			genre: movie.genre,
			tagline: movie.tagline,
			description: movie.description,
			directors: movie.directors,
			runtime: movie.runtime,
			imdb_url: movie.imdb_url,
		});
	};

	useEffect(() => {
		if (newMovie === false) {
			fetchItems();
			console.log("fetching data");
		}
	}, []);

	const handleChange = (e) => {
		const target = e.target.name;
		const input = e.target.value;
		setMovieData({ ...movieData, [target]: input });
	};

	const handleSubmit = (e) => {
		console.log("submit pressed");
		console.log(movieData);
		e.preventDefault();
		if (newMovie === false) {
			axios.put(
				//find a way to get the movie_id here
				url,
				{
					title: movieData.title,
					rating: movieData.rating,
					year: movieData.year,
					users_rating: movieData.users_rating,
					votes: movieData.votes,
					metascore: movieData.metascore,
					img_url: movieData.img_url,
					countries: movieData.countries,
					languages: movieData.languages,
					actors: movieData.actors,
					genre: movieData.genre,
					tagline: movieData.tagline,
					description: movieData.description,
					directors: movieData.directors,
					runtime: movieData.runtime,
					imdb_url: movieData.imdb_url,
				}
			);
		} else {
			axios.post(
				//find a way to get the movie_id here
				url,
				{
					title: movieData.title,
					rating: movieData.rating,
					year: movieData.year,
					users_rating: movieData.users_rating,
					votes: movieData.votes,
					metascore: movieData.metascore,
					img_url: movieData.img_url,
					countries: movieData.countries,
					languages: movieData.languages,
					actors: movieData.actors,
					genre: movieData.genre,
					tagline: movieData.tagline,
					description: movieData.description,
					directors: movieData.directors,
					runtime: movieData.runtime,
					imdb_url: movieData.imdb_url,
				}
			);
		}
	};

	return (
		<Paper>
			<form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<TextField
					name="title"
					label="Title"
					Component
					value={movieData.title}
					onChange={handleChange}
				/>
				<TextField
					name="rating"
					label="Rating"
					Component
					value={movieData.rating}
					onChange={handleChange}
				/>
				<TextField
					name="year"
					label="Year"
					Component
					value={movieData.year}
					onChange={handleChange}
				/>
				<TextField
					name="users_rating"
					label="Users Rating"
					Component
					value={movieData.users_rating}
					onChange={handleChange}
				/>
				<TextField
					name="votes"
					label="votes"
					Component
					value={movieData.votes}
					onChange={handleChange}
				/>
				<TextField
					name="metascore"
					label="metascore"
					Component
					value={movieData.metascore}
					onChange={handleChange}
				/>
				<TextField
					name="img_url"
					label="img_url"
					Component
					value={movieData.img_url}
					onChange={handleChange}
				/>
				<TextField
					name="countries"
					label="countries"
					Component
					value={movieData.countries}
					onChange={handleChange}
				/>
				<TextField
					name="languages"
					label="languages"
					Component
					value={movieData.languages}
					onChange={handleChange}
				/>
				<TextField
					name="actors"
					label="actors"
					Component
					value={movieData.actors}
					onChange={handleChange}
				/>
				<TextField
					name="genre"
					label="genre"
					Component
					value={movieData.genre}
					onChange={handleChange}
				/>
				<TextField
					name="tagline"
					label="tagline"
					Component
					value={movieData.tagline}
					onChange={handleChange}
				/>
				<TextField
					name="description"
					label="description"
					Component
					value={movieData.description}
					onChange={handleChange}
				/>
				<TextField
					name="directors"
					label="directors"
					Component
					value={movieData.directors}
					onChange={handleChange}
				/>
				<TextField
					name="runtime"
					label="runtime"
					Component
					value={movieData.runtime}
					onChange={handleChange}
				/>
				<TextField
					name="imdb_url"
					label="imdb_url"
					Component
					value={movieData.imdb_url}
					onChange={handleChange}
				/>

				<Button
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
			</form>
		</Paper>
	);
};
export default MovieForm;
