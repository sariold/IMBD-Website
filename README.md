# WEB ENGINEERING PROJECT / GROUP 23

by Emre Ozaras(s4102126), Diego Sariol(3593649), Steven van Schagen(s4070887), Vlad Toie(s3905381), and Bora Yilmaz(s3903125)

## 3.0 Introduction

This file contains all information regarding the design, implementation, presentation of the Web Engineering Project on the IMDB Movies Dataset available at Kaggle.

## 3.1: API Design and document a RESTful API that provides the following functionalities:

## 1. retrieve all actors in the dataset, optionally filtered by (full) name;

## `GET/movies/findAllActors`

The GET HTTP Request is the Retrieve action from CRUD. This query path reveals that it will be selecting all actors from all movies, and the optional parameter at the end is used for filtering.

Returns all actors found inside the Kaggle Movie Database, optionally filtered by full name (ascending), or not (descending).

`Parameters:`

1) not required: "sort"(int64)

`Request url: https://ourwebsite.com/api/movies/findAllActors?sorted={ascending/descending}`

`Example url: https://ourwebsite.com/api/movies/findAllActors?sorted=descending`

`Server responses:` 

→ 200: Succesfull operation (JSON):

```json
{
    "message": "All actors from all movies were retrieved successfully",
    "movies": [
        {
            "actors": [
               "Steven van Schagen",
               "Bora Yilmaz",
               "Emre Ozaras",
               "Vlad Toie",
               "Diego Sariol"
            ],
            "_id": "5fd755d86ed84c6903f485bd",
            "title": "The Last Web Engineer"
        },
        {
            "actors": [
                "Keanu Reeves",
                "Ian McShane",
                "Lance Reddick",
                "Bridget Moynahan"
            ],
            "_id": "5fd5347709f56ec6173bc3f3",
            "title": "John Wick"
        },
        {
        ...
        }
    ]
}
```

The above JSON Array representation returns all actors along with the movie they acted in and the id of the movie.

→ 200: Successful operation (CSV):

```xml
"message","movies"
"All actors from all movies were retrieved successfully",
"[{\"actors\":[\"Steven van Schagen\",\"Bora Yilmaz\",\"Emre Ozaras\",\"Vlad Toie\",\"Diego Sariol\"],
\"_id\":\"5fd755d86ed84c6903f485bd\",\"title\":\"The Last Web Engineer\"},
{\"actors\":[\"Keanu Reeves\",\"Ian McShane\",\"Lance Reddick\",\"Bridget Moynahan\"],
\"_id\":\"5fd5347709f56ec6173bc3f3\",\"title\":\"John Wick\"}]",
...
```

→ 404 (Not found): if the database contains no actors

### 1.1 update an actor's information;

## `PUT/movies/actors`

`Parameters:`

1) !required: "id"(int64)

2) not required: "first_name"(String)

3) not required: "last_name"(String)

`Request url: https://ourwebsite.com/movies/actors/{id}`

`Example url: https://ourwebsite.com/movies/actors/0`

The PUT HTTP Request allows a user to update an existing entity in the database. For the case of our REST API, the PUT request will update an existing actor's information, such as their name or the movies they have starred in.

The parameter {id} is used to determine which actor will be updated in the database, since the actor's primary key is not known, a GET request for a specific first_name and last_name should first be computed in order to gain access to their primary key id.

→ JSON BODY:

```json
{
	"name": "Anna de Armas"
}
```

The above JSON object is attached to the PUT request as a JSON body. Since the path param for full name is already known, the RESTful API can update an actor's object to have the information stored inside the transmitted body of text.

`Server responses:` 

→ 200: Successful operation (JSON):

```json
{
	"id": 0,
	"name": "Anna de Armas",
	"movies": [
		"Knock Knock", "Knives Out", "Deep Water"
	]
}
```

→ 200: Successful operation (CSV):

```xml
"id","name","movies",
"0","Anna","de Armas","['Knock Knock','Knives Out','Deep Water']"
```

→ 404 (Not found): if actor id does not exist in the database

The above JSON and CSV representations are the output of a PUT request as it shows the updated information for the actor, Ana de Armas, and the new movie added to the object's movie array. When an actor's information is updated, such as adjusting their name, the movies that they starred in are also updated accordingly.

## 2. all available information about a specific movie identified by its unique IMDB URL or by its (non-unique) title

This GET request retrieves all information on a specific movie that is either identified by its unique URL specification of IMDB, or by its (non-unique) title. It returns all information on a specific movie in the Kaggle Movie Database.

## `GET /movies/info`

`Parameters:`

  1) !required: "iMDB URL"(String) or "title"(String)

`Request url: https://ourwebsite.com/api/movies/info/{url/title}`

`Example url: https://ourwebsite.com/api/movies/info/The%20Shawshank%20Redemption`

`Server responses:`

    → 200: Successful operation (JSON):

```json
{
    "message": "Info on movie specified by title or IMdB URL retrieved successfully",
    "movie": [
        {
            "countries": [
                "USA"
            ],
            "languages": [
                "English"
            ],
            "actors": [
                "Tim Robbins",
                "Morgan Freeman",
                "Bob Gunton",
                "William Sadler",
                "Clancy Brown",
                "Gil Bellows",
                "Mark Rolston",
                "James Whitmore",
                "Jeffrey DeMunn",
                "Larry Brandenburg",
                "Neil Giuntoli",
                "Brian Libby",
                "David Proval",
                "Joseph Ragno",
                "Jude Ciccolella"
            ],
            "genre": [
                "Drama"
            ],
            "directors": [
                "Frank Darabont"
            ],
            "_id": "5fda2170c5d817252ca5fa3d",
            "title": "The Shawshank Redemption",
            "rating": "R",
            "year": 1994,
            "users_rating": 9.3,
            "votes": "2,250,362",
            "metascore": 80,
            "img_url": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL__QL50.jpg",
            "tagline": "Fear can hold you prisoner. Hope can set you free.",
            "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            "runtime": "142 min",
            "imdb_url": "https://www.imdb.com/title/tt0111161/",
            "__v": 0
        }
    ]
}     
```

The above JSON Array representation displays the information of a movie as a JSON Object.

→ 200: Successful operation (CSV):

```xml
"message","movie"
"Info on movie specified by title or IMdB URL retrieved successfully",
"[{\"countries\":[\"USA\"],\"languages\":[\"English\"],
\"actors\":[\"Tim Robbins\",\"Morgan Freeman\",\"Bob Gunton\",\"William Sadler\",\"Clancy Brown\",\"Gil Bellows\",\"Mark Rolston\",\"James Whitmore\",
\"Jeffrey DeMunn\",\"Larry Brandenburg\",\"Neil Giuntoli\",\"Brian Libby\",\"David Proval\",\"Joseph Ragno\",\"Jude Ciccolella\"],\"genre\":[\"Drama\"],
\"directors\":[\"Frank Darabont\"],\"_id\":\"5fda2170c5d817252ca5fa3d\",\"title\":\"The Shawshank Redemption\",\"rating\":\"R\",\"year\":1994,\"users_rating\":9.3,
\"votes\":\"2,250,362\",\"metascore\":80,
\"img_url\":\"https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL__QL50.jpg\",
\"tagline\":\"Fear can hold you prisoner. Hope can set you free.\",
\"description\":\"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.\",\"runtime\":\"142 min\",
\"imdb_url\":\"https://www.imdb.com/title/tt0111161/\",\"__v\":0}]"
```

  → 404 (Not found): This error occurs when the given iMDB url or title name is not known.

## 3. all movies by a specific actor or director identified by name and/or in a specific year

Retrieve all movies by a specific actor or director, identified by their name. The user can also specify the year of the movie(s) for a more filtered listing.

## `GET /movies/findByActorOrDirector`

`Parameters:`

1) !required: "actor_name"(String) or "director_name"(String)

2) not required: "year"(int64)

`Example url: https://ourwebsite.com/api/movies/findByActorOrDirector/{actor_name}/{year}`

`Request url: https://ourwebsite.com/api/movies/findByActorOrDirector/Vlad%20Toie`

`Server responses:` 

→ 200  Successful  Operation  (JSON):

```json
{
    "message": "Movies from the specified actor or director retrieved successfully",
    "movies": [
        {
            "actors": [
                "Steven van Schagen",
                "Bora Yilmaz",
                "Emre Ozaras",
                "Vlad Toie",
                "Diego Sariol"
            ],
            "directors": [
                "David Lynch",
                "Bobby Shmurda"
            ],
            "_id": "5fd755d86ed84c6903f485bd",
            "title": "The Last Web Engineer",
            "year": 2020
        }
    ]
}
```

→200  Successful  Operation (CSV):

```xml
"message","movies"
"Movies from the specified actor or director retrieved successfully",
"[{\"actors\":[\"Steven van Schagen\",\"Bora Yilmaz\",\"Emre Ozaras\",\"Vlad Toie\",\"Diego Sariol\"],
\"directors\":[\"David Lynch\",\"Bobby Shmurda\"],\"_id\":\"5fd755d86ed84c6903f485bd\",\"title\":\"The Last Web Engineer\",\"year\":2020}]"
```

## 4. All movie genres for a specific actor or director, optionally sorted by year(ascending or descending)

Retrieve genres of all movies that a specified actor or director participated in. These genres can also be sorted by the year of the respective movies, ascending or descending by year.

## `GET /movies/genres/findByActorOrDirector/`

`Parameters:`

1) !required: "actor"(String) or "director"(String)

2) not required: "year"(String)

`Request url: https://ourwebsite.com/api/movies/genres/findByActorOrDirector/{name}?year={ascending/descending}`

`Example url: https://ourwebsite.com/api/movies/genres/findByActorOrDirector/John%Doe?year=ascending`

`Server Responses:`

→ 200 Successful Operation (JSON):

```json
{
    "message": "Genres of the specified actor or director retrieved successfully",
    "movies": [
        {
            "genre": [
                "Horror"
            ],
            "_id": "5fd5347709f56ec6173bc3f3",
            "year": 1990
        },
        {
            "genre": [
                "Thriller",
                "Drama"
            ],
            "_id": "5fd5347a09f56ec6173bc3f6",
            "year": 2000
        }
    ]
}
```

→ 200 Successful Operation (CSV):

```xml
"message","movies"
"Genres of the specified actor or director retrieved successfully",
"[{\"genre\":[\"Horror\"],\"_id\":\"5fd5347709f56ec6173bc3f3\",\"year\":1990},
{\"genre\":[\"Thriller\",\"Drama\"],\"_id\":\"5fd5347a09f56ec6173bc3f6\",\"year\":2000}]"
```

## 5. an ordering of the movies ranked by their popularity (user rating) from more to less popular, with the possibility to subset this order, e.g. the top50 movies

Retrieve all movies ranked by their `users_rating` . The results can be limited by a user given parameter. If no parameter is given, it returns all movies sorted by popularity (by default in descending order).

## `GET /movies/sortByPopularity`

`Parameters:`

1) not required: limit (int64)

`Request url: https://ourwebsite.com/api/movies/sortByPopularity?limit={limit}`

`Example url: https://ourwebsite.com/api/movies/sortByPopularity?limit=2`

`Server Responses:`

→ 200 Successful  Operation (JSON):

```json
{
    "status": "success",
    "message": "Movies retrieved successfully",
    "movies": [
        {
            "countries": [
                "Romania"
            ],
            "languages": [
                "Romana"
            ],
            "actors": [
                "Vlad Toie"
            ],
            "genre": [
                "Sci-fi"
            ],
            "directors": [
                "Bora Yilmaz"
            ],
            "_id": "5fd5347709f56ec6173bc3f3",
            "title": "Sample Text 2",
            "rating": "100",
            "year": 2077,
            "users_rating": 100,
            "votes": 1000,
            "metascore": 100,
            "img_url": "www.ranodmwebsite.com/images/t012093kl2",
            "tagline": "Sample Tagline",
            "description": "Sample Desc.",
            "imbdb_url": "www.imdb.com/title/10203040",
            "__v": 0
        },
        {
            "countries": [
                "Netherlands",
                "Malaysia"
            ],
            "languages": [
                "English",
                "Dutch"
            ],
            "actors": [
                "Steven van Schagen",
                "Vlad Toie"
            ],
            "genre": [
                "Thriller",
                "Math"
            ],
            "directors": [
                "David Lynch",
                "Zoroaster"
            ],
            "_id": "5fd755d86ed84c6903f485bd",
            "title": "Incredible Steven",
            "rating": "100",
            "year": 1992,
            "users_rating": 98,
            "votes": 45953,
            "metascore": 97,
            "img_url": "www.images.com/amazing",
            "tagline": "This is very trivial..",
            "description": "Amazing math movie",
            "runtime": "1:42:23",
            "imbdb_url": "www.imdb.com/title/amazingmovie",
            "__v": 0
        }
    ]
}
```

  → 200: Successful operation (CSV):

```xml
"status","message","movies"
"success","Movies retrieved successfully",
"[{\"countries\":[\"Romania\"],\"languages\":[\"Romana\"],\"actors\":[\"Vlad Toie\"],
\"genre\":[\"Sci-fi\"],\"directors\":[\"Bora Yilmaz\"],\"_id\":\"5fd5347709f56ec6173bc3f3\",\"title\":\"Sample Text\",
\"rating\":\"100\",\"year\":2077,\"users_rating\":100,\"votes\":1000,\"metascore\":100,\"img_url\":\"www.ranodmwebsite.com/images/t012093kl2\",
\"tagline\":\"Sample Tagline\",\"description\":\"Sample Desc.\",\"imbdb_url\":\"www.imdb.com/title/10203040\",\"__v\":0},
{\"countries\":[\"Netherlands\",\"Malaysia\"],\"languages\":[\"English\",\"Dutch\"],\"actors\":[\"Steven van Schagen\",\"Vlad Toie\"],
\"genre\":[\"Thriller\",\"Math\"],\"directors\":[\"David Lynch\",\"Zoroaster\"],\"_id\":\"5fd755d86ed84c6903f485bd\",\"title\":\"Incredible Steven\",
\"rating\":\"100\",\"year\":1992,\"users_rating\":98,\"votes\":45953,\"metascore\":97,\"img_url\":\"www.images.com/amazing\",\"tagline\":\"This is very trivial..\",
\"description\":\"Amazing math movie\",\"runtime\":\"1:42:23\",\"imbdb_url\":\"www.imdb.com/title/amazingmovie\",\"__v\":0}]"
```

## 6. an ordering of movies in a specific year ranked and subsetted by popularity as above

Retrieve a list of movies in a specific year, ranked and subsetted by their popularity. The user can specify the limit of the subset, and/or the way in which the ranking should be organized(ascending or descending) through the sortBy parameter. (0 ascending, 1 for descending ~ default)

## `GET /movies/sortMoviesInYear`

`Parameters:`

1) !required: year (int64)

2) not required: limit (int64)

`Request url: https://ourwebsite.com/api/movies/sortMoviesInYear/:year?limit={limit}`

`Example url: https://ourwebsite.com/api/movies/sortMoviesInYear/2000?limit=2`

`Server Responses:`

→ 200 Successful (JSON):

```json
{
    "status": "success",
    "message": "Movies retrieved successfully",
    "movies": [
        {
            "countries": [
                "Romania"
            ],
            "languages": [
                "Romana"
            ],
            "actors": [
                "Vlad Toie"
            ],
            "genre": [
                "Sci-fi"
            ],
            "directors": [
                "Bora Yilmaz"
            ],
            "_id": "5fd5347709f56ec6173bc3f3",
            "title": "Sample Text 1",
            "rating": "100",
            "year": 2000,
            "users_rating": 100,
            "votes": 1000,
            "metascore": 100,
            "img_url": "www.ranodmwebsite.com/images/t012093kl2",
            "tagline": "Sample Tagline",
            "description": "Sample Desc.",
            "imbdb_url": "www.imdb.com/title/10203040",
            "__v": 0
        },
        {
            "countries": [
                "Netherlands",
                "Malaysia"
            ],
            "languages": [
                "English",
                "Dutch"
            ],
            "actors": [
                "Steven van Schagen",
                "Vlad Toie"
            ],
            "genre": [
                "Thriller",
                "Math"
            ],
            "directors": [
                "David Lynch",
                "Zoroaster"
            ],
            "_id": "5fd755d86ed84c6903f485bd",
            "title": "Incredible Steven 2",
            "rating": "100",
            "year": 2000,
            "users_rating": 98,
            "votes": 45953,
            "metascore": 97,
            "img_url": "www.images.com/amazing",
            "tagline": "This is very trivial..",
            "description": "Amazing math movie",
            "runtime": "1:42:23",
            "imbdb_url": "www.imdb.com/title/amazingmovie",
            "__v": 0
        }
    ]
}
```

→ 200 Successful Operation (CSV):

```xml
"status","message","movies"
"success","Movies retrieved successfully",
"[{\"countries\":[\"Romania\"],\"languages\":[\"Romana\"],\"actors\":[\"Vlad Toie\"],\"genre\":[\"Sci-fi\"],\"directors\":[\"Bora Yilmaz\"],\"_id\":\"5fd5347709f56ec6173bc3f3\",
\"title\":\"Sample Text 1\",\"rating\":\"100\",\"year\":2000,\"users_rating\":100,\"votes\":1000,\"metascore\":100,\"img_url\":\"www.ranodmwebsite.com/images/t012093kl2\",
\"tagline\":\"Sample Tagline\",\"description\":\"Sample Desc.\",\"imbdb_url\":\"www.imdb.com/title/10203040\",\"__v\":0},
{\"countries\":[\"Netherlands\",\"Malaysia\"],\"languages\":[\"English\",\"Dutch\"],\"actors\":[\"Steven van Schagen\",\"Vlad Toie\"],
\"genre\":[\"Thriller\",\"Math\"],\"directors\":[\"David Lynch\",\"Zoroaster\"],\"_id\":\"5fd755d86ed84c6903f485bd\",\"title\":\"Incredible Steven 2\",
\"rating\":\"100\",\"year\":2000,\"users_rating\":98,\"votes\":45953,\"metascore\":97,\"img_url\":\"www.images.com/amazing\",
\"tagline\":\"This is very trivial..\",\"description\":\"Amazing math movie\",\"runtime\":\"1:42:23\",\"imbdb_url\":\"www.imdb.com/title/amazingmovie\",\"__v\":0}]"
```

## 7. descriptive statistics (mean, median, standard deviation) for the popularity of all movies for a particular actor with an optional filter by year.

Retrieve the descriptive statistics for the popularity of all movies from a specific actor, with the option of narrowing down the results to a specific year, through the `year` parameter.

## `GET /movies/statistics`

`Parameters:`

1) !required =  actor_name(String)

2) not required = year(int64)

`Request url: https://ourwebsite.com/api/movies/statistics/{actor_name}`

`Example url: https://ourwebsite.com/api/movies/statistics/Jason%20Momoa`

`Server Responses:`

→ 200 Successful (JSON):

```json
[
  {
		"actor_name": "Jason Momoa",
		"mean":"7.0",
		"median":"6.5",
		"standard_deviation":"2.0",
		"year":"N/A"
  }
]
```

→ 200 Successful Operation (CSV):

```xml
"actor_name","mean","median","standard_deviation","year",
"Jason Momoa","7.0","6.5","2.0","N/A"
```

## 8. CUD DESIGN

## `POST /movies` → Create a movie.

Movie object that needs to be added to the database.

`Request url: https://ourwebsite.com/movies`

`**Curl**`

→ `curl -X POST "https://ourwebsite.com/movies" -H "accept: application/json" -H "Content-Type: application/json" -d "JSON BODY"`

`**Server responses:`** 

- 405 : METHOD NOT ALLOWED (Invalid input)

→ JSON:

```json
[
	{
		"title": "Shrek is Alive", 
		"rating": "R", 
		"year": "2020", 
		"users_rating": "10.0", 
		"votes": "3,101,101,101", 
		"metascore": "99", 
		"img_url": "http://some/imagejpg", 
		"countries": [
			{
				"Bulgaria"
			}
		], 
		"languages": [
			{
				"Chinese"
			}
		], 
		"actors": [
			{
				"Shrek himself"
			}
		], 
		"genre": [
			{
				"Action"
			}
		], 
		"tagline": 
			"Onions.",
		"description": 
			"What are you doing in my swamp.", 
		"directors": [
			{
				"Shrek's dad"
			}
		], 
		"runtime": 
			"forever min", 
		"imdb_url": 
			"http://shrek.movie.ro"
	}
]
```

## `PUT /movies` → Update an existing movie.

Movie object, which already exists in the database, that needs to be updated.

`Request url: https://ourwebsite.com/movies`

`**Curl**`

→ `curl -X PUT "https://ourwebsite.com/movies" -H "accept: application/json" -H "Content-Type: application/json" -d "JSON BODY"`

`**Server responses:`**  

- 400 Invalid ID supplied(of movie).
- 404 Movie not found.
- 405 Validation exception(Invalid input).

→ JSON: 

```json
[
	{
		"title": "Shrek is Alive", 
		"rating": "R", 
		"year": "2020", 
		"users_rating": "10.0", 
		"votes": "3,101,101,101", 
		"metascore": "99", 
		"img_url": "http://some/imagejpg", 
		"countries": [
			{
				"Bulgaria"
			}
		], 
		"languages": [
			{
				"Chinese"
			}
		], 
		"actors": [
			{
				"Shrek himself"
			}
		], 
		"genre": [
			{
				"Action"
			}
		], 
		"tagline": 
			"Onions.",
		"description": 
			"What are you doing in my swamp.", 
		"directors": [
			{
				"Shrek's dad"
			}
		], 
		"runtime": 
			"infinite min", 
		"imdb_url": 
			"http://shrek.movie.ro"
	}
]
```

## `DELETE /movies` → Deletes a movie.

Movie object, which already exists in the database, that needs to be deleted.

`Request url: https://ourwebsite.com/movies/{movieId}`

`Example url: https://ourwebsite.com/movies/1`

`**Curl**`

→ `curl -X DELETE "https://ourwebsite.com/movies/1" -H "accept: application/json"`

`**Server responses:`**  

- 400 Bad request.
- 404 Movie not found.

## 3.2 Architecture and Technologies Used

In this web application, the MERN stack is implemented. MERN stands for MongoDB, Express.js, React.js, and Node.js. MongoDB is the database that is used for storing the JSON file containing all the movies. Express.js and Node.js are used for the Web framework and the prime Web server, respectively. React.js provides the functionality for the framework on the client's side. 

In this application, required functions are implemented by using Mongoose functionalities on a movie model that was created according to the structure in the movies.json. We have decoupled the model and controller and created a separate file called movie controller for the implementation of the required functions. 

We have also created a seperate file to hold the routes, which have been created for requirements as follows:

1) "/movies/findAllActors/", "/movies/findAllActors/:sort"

2) "/movies/info/:titleOrUrl"

3)"/movies/findByActorOrDirector/:actor_name", "/movies/findByActorOrDirector/:actor_name/:year"

4) "/movies/genres/findByActorOrDirector/:actor_name"

5) "/movies/sortByPopularity", "/movies/sortByPopularity/:limit"

6) "/movies/sortMoviesInYear/:year", "/movies/sortMoviesInYear/:year/:limit"

7) "/movies/statistics/:actor_name"

## 1. MongoDB

MongoDB is a document database. It is a NoSQL database, so it does not store and retrieve data in means of tabular relations and structures, but rather in Collections which is perfect for JavaScript. Our choice of MongoDB arises from it's ability to represent data in JSON, abstraction through Mongoose modelling (see next heading), and it's document orientation allowing fast performance and ease of usage (coding). Also as an extra, it's popularity allows finding help or documentation faster in case any issues arise.

### 1.1 Mongoose ODM

Mongoose is an object data modelling library to be used with Node.js and MongoDB. It provides a modelling environment for our movie data. Mongoose allows abstraction over simply using MongoDB on its own by defining schemas and models.  The main reason behind our choice of Mongoose instead of going with MongoDB on it's own is this abstraction and ease of connecting to and using MongoDB. The schema abstraction helps with structuring the schema-less data on MongoDB, and the model abstraction helps with working with data retrieved from the database as if they are objects.

### 2. Express

Express.js is our back-end component of the MERN stack. It is a prebuilt framework of Node.js and is very popular. It excels at working with large volumes of input or clients thanks to its Event Loop and Timers. Express handles asynchronous computation and I/O operations efficiently, which proves useful in API design where we have a lot of movies as the main data. Express eases the coding and development also. What proved most useful for us in our development is that Express allows the developer to define routes of the application based on HTTP and URLs and is easy to connect with MongoDB, which is the database component of the MERN stack.

### 3. React

React is the front-end component of the MERN stack. The purpose of using React JS is to construct both user interfaces and front-end applications for the end goal consumer. React components make up almost an entirety of the front-end of the site. This is because the search bar element and the movie grid are both instances of a React component which allows for functions such as useState() and useEffect(). Both of these functions allow the user to interact with the search form and have the server fetching data from the back-end in order to provide the user with a continuous updated view of movies and actors. 

### 4. Node

The main Web server of this application was built with Node. Node is a framework that builds Web servers and networking connections. Node contains non-blocking functionality and it uses callbacks to inform the user on completion or failure of the request.

## 3.3 Setup of the Website

The setup of the website follows some basic steps. 

First of all, Nodejs should be installed on the computer. That can be done via following the download and install on [nodejs.org](https://nodejs.org/en/)

For both the backend and frontend to work, all Node dependencies, packages require installment. After going to the directory /api_backend/api_node/, run the following command

```xml
npm install
```

Do the same for the directory  /api_frontend/, this will do the install for the frontend.

Note these two installs may take some time. (Up to one or two minutes).

This was to install dependencies in the local node_modules folder. If any issues such as uncrecognized functions arise, this step should be repeated and corrected.

Now all that's left is to run the backend and frontend, and then use the website. See the next section for the usage.

### Running Backend

First, have two seperate access points (Command Line Interfaces) to run parallel processes.

In one of them, after going to the directory `/api_backend/api_node/`, running the commands

```xml
npm start
```

will start the backend connection to the database and host the API on the following URL: `http://localhost:8080`

### Running Frontend

On the second access point, after going to the directory `/api_frontend/`, running the commands

```xml
npm start
```

will start the frontend interface of the website, which can be viewed and used through a browser. Running the frontend will direct you to the website with your preferred web browser, on the following URL: `http://localhost:3000`

## 3.4 Usage

While both the backend and the frontend processes are running, to access the website going to your internet browser and then going to the address

[localhost:3000](http://localhost:3000)

will grant access to the website which is hosted locally. 

All available and supported operations on the website can be seen directly on the main page. To create, edit, update particular information, there are buttons highlighted in the respective pages where they are supported operations.

## 3.5 Efforts

### Outcomes milestones

In the first milestone of the project, the RESTful API was designed and documented as listed in section 3.1. In this section, all required functionality is designed with Resource Identification that uses URIs to uniquely identify resources, and the representation of the responses. The following functionalities were designed (of which the endpoints should support JSON and CSV representations, but should in no case return HTML representations):

- all actors in the dataset, optionally filtered by (full) name;
- all available information about a specific movie identified by its unique IMDb URL or by its (non-unique) title;
- all movies by a specific actor or director identified by name and/or in specific year;
- all movie genres for a specific actor or director, optionally sorted by year (ascending or descending);
- an ordering of the movies ranked by their popularity (user rating) from more to less popular, with the possibility to subset this order, e.g. the top 50 movies;
- an ordering of movies in a specific year ranked and subsettes by popularity as above;
- descriptive statistics (mean, median, standard deviation) for the popularity of all movies for a particular actor with an optional filter by year.

Additional CUD fuctionality that is included in the API:

- creation of a movie;
- update (the attributes of) a movie;
- deletion of a movie.

In the second and third milestone the backend and frontend, respectively, were implemented using a MERN stack, as described in section 3.2. In the backend HATEOAS (Hypermedia as the Engine of Application State) was used to let the user navigate to identifiable resources through SDM (Self-Describing Messages) in the frontend. For instance, the user can click on the link of a Movie to be navigated to the page where the information of the movie will be displayed.

### Division of work

The functionality points listed in section 3.1 were divided as follows. Points 1 up to and including 5 were designed and implemented in the back-end and front-end by a single student. Points from 6 up to and including were done jointly. The writing of the documentation and report was also done jointly as a group.

Point implemented by:

1. Diego Sariol
2. Steven van Schagen
3. Vlad Toie
4. Bora Yilmaz
5. Emre Ozaras

## 3.6 Bonus

In order to provide the end user with the simplest and easiest solution possible, we decided to host the back-end, the front-end, and the Kaggle movie database all online. We discovered that if by using a MongoDB database, we could create a free MongoDB atlas account and host the entire movie database online. This meant that the user did not have to locally host the database on their machine. Using the online tool, Heroku, we were able to host both server as Hobby Dynos which mean they never enter a sleepmode and are almost instantaneous in response time. The code hosted on Heroku has only one minor change, and that is the request URL's needed to be updated to communicate with the newly hosted back-end server. We decided to go one step further and apply for a free domain name from the site, freeNom, in order to make our online IAmDBee application look as professional as possible. Once the domain name was registered, all we had to do was configure DNS fowarding to our Heroku front-end site.

Also, in the back-end the Python file [populateDB.py](http://populatedb.py) was used as a script to populate the database.

The website is hosted @ [http://www.iamdbee.tk](http://www.iamdbee.tk)