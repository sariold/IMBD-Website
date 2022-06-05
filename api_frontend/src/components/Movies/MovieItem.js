import React from "react";

const MovieItem = ({ item }) => {
	/**
	 * We wanted to represent the Movie objects in a way that the user
	 * would easily be able to interact with them, and as so we have created "card" items
	 * for each of the movie.
	 */
	return (
		<div className="card">
			<div className="card-inner">
				<div className="card-front">
					<img src={item.img_url} alt="" />
				</div>
				<div className="card-back">
					<h1>{item.title}</h1>
					<ul>
						<li>
							<strong>Genres:</strong> {item.genre.join(", ")}
						</li>
						<li>
							<strong>
								IMDb URL: <a href={item.imdb_url}>Click here</a>
							</strong>
						</li>
						<li>
							<strong>Runtime:</strong> {item.runtime}
						</li>
						<li>
							<strong>User rating:</strong> {item.users_rating}
						</li>
						<li>
							<strong><a href={"/movies/" + item._id}>View more details</a></strong>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default MovieItem;
