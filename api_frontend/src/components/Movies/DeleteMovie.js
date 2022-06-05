import axios from "axios";
import { Component } from "react";
import { Alert } from "reactstrap";

/**
 * When we access /movie/_movie_id_/delete we would like to have a somewhat similar logic
 * to the ShowSpecificMovie method. With this in mind, we simply take the substring between
 * indexes 8 and for from the current pathname (which would be /movies/_24_characters_movie_id_string_/delete)
 * and that substring is, as expected, the id of the movie that we want to delete. After successfully retrieving
 * the id of the movie, a forward to the backend is done and then should the movie be successfully deleted, the user
 * is notified about this action and redirected to the front page.
 */
class DeleteMovie extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const deleteMovie = async () => {
			await axios
				.delete(
					`http://localhost:8080/api/movies/${this.props.location.pathname.substring(
						8,
						32
					)}`
				)
				.catch((error) => console.log(error))
				.then((res) => {
					setTimeout(() => {
						window.location.href = "http://localhost:3000/";
					}, 3000);
				});
		};
		deleteMovie();

		console.log(this.props.location.pathname.substring(8, 32));
	}

	render() {
		return (
			<Alert color="success">
				{" "}
				Movie successfully deleted. Redirecting...{" "}
			</Alert>
		);
	}
}

export default DeleteMovie;
