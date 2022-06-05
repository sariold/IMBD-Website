// Initialize express router
let router = require("express").Router();
var movieController = require("../controller/movieController");

router.get("/", function (req, res) {
	res.json({
		status: "API is Working",
		message: "Welcome to our project!",
	});
});

router.route("/movies/findAllActors/").get(movieController.findAllActors);

router
	.route("/movies/findAllActors/:name")
	.get(movieController.findAllActorsWithName);

router.route("/movies").get(movieController.index).post(movieController.new);

router
	.route("/movies/sortByPopularity/:limit?")
	.get(movieController.sortByPopularity);

router
	.route("/movies/sortMoviesInYear/:year/:limit?")
	.get(movieController.sortMoviesInYear);

router
	.route("/movies/statistics/:actor_name")
	.get(movieController.statisticsActor);

router
	.route("/movies/:movies_id")
	.get(movieController.view)
	.patch(movieController.update)
	.put(movieController.update)
	.delete(movieController.delete);

router.route("/movies/info/:titleOrUrl").get(movieController.infoMovie);

router
	.route("/movies/genres/findByActorOrDirector/:actor_name?/:sort?")
	.get(movieController.findGenreByActorOrDirector);

router
	.route("/movies/findByActorOrDirector/:actor_name")
	.get(movieController.findByActorOrDirector);

router
	.route("/movies/findByActorOrDirector/:actor_name/:year?")
	.get(movieController.findByActorOrDirectorWithYear);

module.exports = router;
