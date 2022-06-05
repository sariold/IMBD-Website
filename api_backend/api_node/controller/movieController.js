Movie = require("../model/movieModel");

/**
 * Retrieve all movies
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system retrieves all found movies from the database.
 */
exports.index = function (req, res) {
	Movie.find({}, function (err, movies) {
		if (error(err, res)) {
			return;
		}
		res.json({
			status: "success",
			message: "Movies retrieved successfully",
			movies,
		});
	}).limit(50);
};

/**
 * Retrieve with all actors
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system retrieves all found actors from every movie in the database.
 */
exports.findAllActors = function (req, res) {
	Movie.find(
		{},
		["actors", "img_url", "title", "runtime", "imdb_url"],
		function (err, movies) {
			if (error(err, res)) {
				return;
			}
			res.json({
				message:
					"All actors from all movies were retrieved successfully",
				movies,
			});
		}
	)
		.sort({ actors: "descending" })
		.limit(50);
};

/**
 * Retrieve with all actors with said name
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system retrieves all found actors from every movie in the database with said name.
 */
exports.findAllActorsWithName = function (req, res) {
	let regex = new RegExp(req.params.name, "i");
	Movie.find(
		{ actors: { $in: regex } },
		[
			"title",
			"year",
			"actors",
			"directors",
			"genre",
			"imdb_url",
			"runtime",
			"img_url",
		],
		function (err, movies) {
			if (error(err, res)) {
				return;
			}
			res.json({
				message:
					"All actors with said name from all movies were retrieved successfully",
				movies,
			});
		}
	)
		.sort({ actors: "descending" })
		.limit(50);
};

/**
 * Retrieve all info on a movie by its title or IMdB URL
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system retrieves all information about a specific year, given either
 * its title or the IMdB URL.
 */
exports.infoMovie = function (req, res) {
	let regex = new RegExp(req.params.titleOrUrl, "i");
	Movie.find(
		{
			$or: [{ title: regex }, { imdb_url: regex }],
		},
		function (err, movies) {
			if (error(err, res)) {
				return;
			}
			res.json({
				message:
					"Info on movie specified by title or IMdB URL retrieved successfully",
				movies,
			});
		}
	).limit(50);
};

/**
 * Retrieve all movies by an actor or director
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system retrieves all found movies for given actor or director name.
 */
exports.findByActorOrDirector = function (req, res) {
	let regex = new RegExp(req.params.actor_name, "i");
	Movie.find(
		{
			$or: [{ actors: regex }, { directors: regex }],
		},
		[
			"title",
			"year",
			"actors",
			"directors",
			"genre",
			"imdb_url",
			"runtime",
			"img_url",
		],
		function (err, movies) {
			if (error(err, res)) {
				return;
			}
			res.json({
				message:
					"Movies from the specified actor or director retrieved successfully",
				movies,
			});
		}
	).limit(50);
};

/**
 * Retrieve all movies by an actor or director, filtered by year.
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system retrieves all found movies for given actor or director name, filtered by year.
 */
exports.findByActorOrDirectorWithYear = function (req, res) {
	let regex = new RegExp(req.params.actor_name, "i");
	Movie.find(
		{
			$or: [{ actors: regex }, { directors: regex }],
			year: req.params.year,
		},
		["title", "year", "actors", "directors"],
		function (err, movies) {
			if (error(err, res)) {
				return;
			}
			res.json({
				message:
					"Movies from the specified actor or director retrieved successfully",
				movies,
			});
		}
	).limit(50);
};

/**
 * Retrieve all genres by an actor or a director in a descending order of year.
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system finds all the genres from the movies that the actor or director.
 */
exports.findGenreByActorOrDirector = function (req, res) {
	let regex = new RegExp(req.params.actor_name, "i");
	Movie.find(
		{
			$or: [{ actors: regex }, { directors: regex }],
		},
		["actors", "directors", "year", "genre", "title"]
	)
		.sort({ year: req.params.sort })
		.limit(50)
		.exec((err, movies) => {
			if (error(err, res)) {
				return;
			}
			if (req.params.actor_name === undefined) movies = [];
			res.json({
				message:
					"Genres of the specified actor or director retrieved successfully",
				movies,
			});
		});
};

/**
 * Retrieve all movies sorted by their popularity(user rating)
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system retrieves a (descending) sorting by users_rating of all Movies with the option of specifying a limit.
 */
exports.sortByPopularity = function (req, res) {
	var num = 300;
	if (parseInt(req.query.limit) < num && parseInt(req.query.limit) > 0) {
		num = parseInt(req.query.limit);
	}
	Movie.find({})
		.sort({ users_rating: "descending" })
		.limit(num)
		.exec((err, movies) => {
			if (error(err, res)) {
				return;
			}
			res.json({
				status: "success",
				message: "Movies retrieved successfully",
				movies,
			});
		});
};

/**
 * Function that calculates the mean of the user ratings of the movies
 *
 * @param {movies} the array of movies
 * @param {length} the length of the array of movies
 */
var calcMean = function (movies, length) {
	var sum = 0;
	movies.forEach((movie) => {
		sum += movie.users_rating;
	});
	return sum / length;
};

/**
 * Function that calculates the median of the user ratings of the movies
 *
 * @param {movies} the array of movies
 * @param {length} the length of the array of movies
 */
var calcMedian = function (movies, length) {
	var median = 0;
	if (length % 2 == 0) {
		median =
			(movies[length / 2 - 1].users_rating +
				movies[length / 2].users_rating) /
			2;
	} else {
		median = movies[length / 2 - 0.5].users_rating;
	}
	return median;
};

/**
 * Function that calculates the standard deviation of the user ratings of the movies
 *
 * @param {movies} the array of movies
 * @param {length} the length of the array of movies
 */
var stdev = function (movies, length, mean) {
	var sdSum = 0;
	movies.forEach((movie) => {
		sdSum += (movie.users_rating - mean) ^ 2;
	});
	return Math.sqrt(sdSum / length);
};

/**
 * Statistics of an actor
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system finds all the Movies from a specified actor and calculates the mean, median and
 * the standard deviation of the users_rating for that actor.
 */
exports.statisticsActor = function (req, res) {
	let regex = new RegExp(req.params.actor_name, "i");
	Movie.find({ actors: regex }, ["title", "users_rating"])
		.sort({ users_rating: "ascending" })
		.limit(50)
		.exec((err, movies) => {
			if (error(err, res)) {
				return;
			}

			var length = movies.length;
			var mean = 0;
			var median = 0;
			var sd = 0;

			if (length > 1) {
				mean =
					Math.round(
						(calcMean(movies, length) + Number.EPSILON) * 1000
					) / 1000;
				median =
					Math.round(
						(calcMedian(movies, length) + Number.EPSILON) * 1000
					) / 1000;
				sd =
					Math.round(
						(stdev(movies, length, mean) + Number.EPSILON) * 1000
					) / 1000;
			}

			res.json({
				status:
					"Mean, Median, and Standard Deviation were all successfully computed",
				mean: mean,
				median: median,
				standard_deviation: sd,
				movies,
			});
		});
};

/**
 * Ordering of movies in specific year
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system retrieves a (descending) sorting by users_rating of all Movies found in a specific
 * year, with the option of specifying a limit.
 */
exports.sortMoviesInYear = function (req, res) {
	var num = 300;
	if (parseInt(req.query.limit) < num && parseInt(req.query.limit) > 0) {
		num = parseInt(req.query.limit);
	}
	Movie.find({ year: req.params.year })
		.sort({ users_rating: "descending" })
		.limit(num)
		.exec((err, movies) => {
			if (error(err, res)) {
				return;
			}
			res.json({
				status: "success",
				message: "Movies retrieved successfully",
				movies,
			});
		});
};

/**
 * Retrieve a specific movie(by id)
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system retrieves a specific Movie, given its ID.
 */
exports.view = function (req, res) {
	Movie.findById(req.params.movies_id, function (err, movie) {
		if (error(err, res)) {
			return;
		}
		res.json({
			message: "Movie details loading..",
			movie,
		});
	});
};

/**
 * Handle create movie
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system adds a new Movie to the database, with the given information from
 * the request body.
 */
exports.new = function (req, res) {
	var movie = new Movie();

	movie.title = req.body.title ? req.body.title : movie.title;
	movie.rating = req.body.rating;
	movie.year = req.body.year;
	movie.users_rating = req.body.users_rating;
	movie.votes = req.body.votes;
	movie.metascore = req.body.metascore;
	movie.img_url = req.body.img_url;
	movie.countries = req.body.countries;
	movie.languages = req.body.languages;
	movie.actors = req.body.actors;
	movie.genre = req.body.genre;
	movie.tagline = req.body.tagline;
	movie.description = req.body.description;
	movie.directors = req.body.directors;
	movie.runtime = req.body.runtime;
	movie.imdb_url = req.body.imdb_url;

	movie.save(function (err) {
		if (error(err, res)) {
			return;
		}
		res.json({
			message: "New movie created!",
			movie,
		});
	});
};

/**
 * Handle update movie info
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 *	The system updated the Movie found at the id specified in the request, with the given
 *  information from the request body.
 */
exports.update = function (req, res) {
	Movie.findById(req.params.movies_id, function (err, movie) {
		if (err) {
			res.send(err);
			movie.title = req.body.title ? req.body.title : movie.title;
		}

		movie.title = req.body.title ? req.body.title : movie.title;
		movie.rating = req.body.rating;
		movie.year = req.body.year;
		movie.users_rating = req.body.users_rating;
		movie.votes = req.body.votes;
		movie.metascore = req.body.metascore;
		movie.img_url = req.body.img_url;
		movie.countries = req.body.countries;
		movie.languages = req.body.languages;
		movie.actors = req.body.actors;
		movie.genre = req.body.genre;
		movie.tagline = req.body.tagline;
		movie.description = req.body.description;
		movie.directors = req.body.directors;
		movie.runtime = req.body.runtime;
		movie.imdb_url = req.body.imdb_url;

		movie.save(function (err) {
			if (error(err, res)) {
				return;
			}
			res.json({
				message: "Movie Info updated",
				movie,
			});
		});
	});
};

/**
 * Handle delete movie
 *
 * @param {req} the web request object
 * @param {res} the web response object
 *
 * The system deletes the Movie found at the id specified in the request.
 */
exports.delete = function (req, res) {
	Movie.remove(
		{
			_id: req.params.movies_id,
		},
		function (err, movie) {
			if (error(err, res)) {
				return;
			}
			res.json({
				status: "success",
				message: "Movie deleted",
			});
		}
	);
};

/**
 * function that handles errors
 *
 * @param {err} the error object
 * @param {res} the web response object
 */
error = function (err, res) {
	if (err) {
		res.json({
			status: "error",
			message: err,
		});
	}
	return err;
};
