import React from "react";

const InfoItem = ({ movie }) => {
	return (
		<div className="card">
			<div className="card-inner">
				<div className="card-front">
					<img src={movie.img_url} alt="" />
				</div>
				<div className="card-back">
					<h1>{movie.title}</h1>
					<ul>
						<li>
							<strong>Title:</strong> {movie.title}
						</li>
						<li>
							<strong>Rating:</strong> {movie.rating}
						</li>
						<li>
							<strong>Year:</strong> {movie.year}
						</li>
						<li>
							<strong>Users rating:</strong> {movie.users_rating}
						</li>
						<li>
							<strong>Metascore:</strong> {movie.metascore}
						</li>
						<li>
							<strong>Languages:</strong>{" "}
							{movie.languages.join(", ")}
						</li>
						<li>
							<strong>Actors:</strong> {movie.actors.join(", ")}
						</li>
						<li>
							<strong>Description:</strong> {movie.description}
						</li>
						<li>
							<strong>Directors:</strong>{" "}
							{movie.directors.join(", ")}
						</li>
						<li>
							<strong>Runtime:</strong> {movie.runtime}
						</li>
						<li>
							<strong>IMDb URL:</strong> <a href={movie.imdb_url}>Click here</a>
						</li>
						<li>
							<strong>
								<a href={"/movies/" + movie._id}>
									View more details
								</a>
							</strong>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default InfoItem;
