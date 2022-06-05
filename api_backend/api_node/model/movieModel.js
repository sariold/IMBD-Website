var mongoose = require('mongoose');

/**
 * Schema consists of:
 *   - title: title of movie (String)
 *   - rating: content rating (String)
 *   - year: year when movie was released (Number)
 *   - users_rating: average rating of users (Number)
 *   - votes: number of votes of users (Number)
 *   - metascore: meta rating of movie (Number)
 *   - img_url: url of the image of the movie (String)
 *   - countries: countries where the movie was filmed (array of String)
 *   - languages: languages that are spoken in movie (array of String)
 *   - actors: actors that play in movie (array of String)
 *   - genre: genres that categorize the movie (array of String)
 *   - tagline: slogan of movie (String)
 *   - description: short summary of movie (String)
 *   - directors: directors of movie (array of String)
 *   - runtime: duration of movie (String)
 *   - imdb_url: url of the imdb link to the movie (String)
 */
var movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: false
    },
    users_rating: {
        type: Number,
        required: false
    },
    votes: {
        type: String,
        required: false
    },
    metascore: {
        type: Number,
        required: false
    },
    img_url: {
        type: String,
        required: false
    },
    countries: {
        type: [String],
        required: false
    },
    languages: {
        type: [String],
        required: false
    },
    actors: {
        type: [String],
        required: false
    },
    genre: {
        type: [String],
        required: false
    },
    tagline: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    directors: {
        type: [String],
        required: false
    },
    runtime: {
        type: String,
        required: false
    },
    imdb_url: {
        type: String,
        required: false
    }
});

var Movie = module.exports = mongoose.model('movie', movieSchema);

module.exports.get = function (callback, limit) {
    Movie.find(callback).limit(limit);
}