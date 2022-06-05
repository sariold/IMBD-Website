import { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import MovieForm from "./MovieForm";
import Popup from "reactjs-popup";

	/**
	 * Displays a specific movie
	 * 
	 * When accessing the path /movies/id we would like to retrieve the last 24 characters
	 * of the location.pathname, which in this case will be the id of the movie. We then do a query
	 * to the backend with this 24 characters and retrieve information for a specific movie, so that we could
	 * display it in a nice manner.
	 */
class ShowSpecificMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: [],
		};
	}

	componentDidMount() {
		const fetchItems = async () => {
			const result = await axios(
				`http://localhost:8080/api/movies/${this.props.location.pathname.slice(
					-24
				)}`
			);
			this.setState({ item: result.data.movie });
			console.log(this.state.item);
		};
		fetchItems();
	}

	render() {
		return (
			<div>
				<div>
					<img
						className="sIMG"
						src={this.state.item.img_url}
						alt=""
					/>
				</div>
				<div>
					<h1>{this.state.item.title}</h1>
					{this.state.item.description}
					<ul>
						<li>
							<strong>Languages:</strong>{" "}
							{this.state.item.languages &&
								this.state.item.languages.join(", ")}
						</li>
						<li>
							<strong>
								IMDb URL:{" "}
								<a href={this.state.item.imdb_url}>Here</a>
							</strong>
						</li>
						<li>
							<strong>Countries:</strong>{" "}
							{this.state.item.countries &&
								this.state.item.countries.join(", ")}
						</li>
						<li>
							<strong>Actors:</strong>{" "}
							{this.state.item.actors &&
								this.state.item.actors.join(", ")}
						</li>
						<li>
							<strong>Genre:</strong>{" "}
							{this.state.item.genre &&
								this.state.item.genre.join(", ")}
						</li>
						<li>
							<strong>Directors:</strong>{" "}
							{this.state.item.directors &&
								this.state.item.directors.join(", ")}
						</li>
						<li>
							<strong>Rating:</strong> {this.state.item.rating}
						</li>
						<li>
							<strong>Runtime:</strong> {this.state.item.runtime}
						</li>
						<li>
							<strong>Year:</strong> {this.state.item.year}
						</li>
						<li>
							<strong>Users rating:</strong>{" "}
							{this.state.item.users_rating}
						</li>
						<li>
							<strong>Votes:</strong> {this.state.item.votes}
						</li>
						<li>
							<strong>Metascore:</strong>{" "}
							{this.state.item.metascore}
						</li>
					</ul>
				</div>
				<a href={this.props.location.pathname.slice(-24) + "/delete"}>
					<Button color="danger">Delete this movie</Button>
				</a>
				<br />
				<Popup
					trigger={<Button color="warning"> Edit Movie</Button>}
					position="right center"
					modal
					nested
				>
					<MovieForm
						url={`http://localhost:8080/api/movies/${this.props.location.pathname.slice(
							-24
						)}`}
						newMovie={false}
					></MovieForm>
				</Popup>
			</div>
		);
	}
}

export default ShowSpecificMovie;
