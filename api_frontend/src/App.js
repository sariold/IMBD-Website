import React, { Component, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/ui/Header";
import FindByActorOrDirector from "./components/Movies/FindByActorOrDirector";
import FindGenreByActorOrDirector from "./components/Genres/FindGenreByActorOrDirector";
import AllMovies from "./components/Movies/AllMovies";
import AllActors from "./components/Actors/AllActors";
import InfoMovies from "./components/Movies/info/InfoMovies";
import SortByPop from "./components/Movies/SortByPop";
import ShowSpecificMovie from "./components/Movies/ShowSpecificMovie";
import DeleteMovie from "./components/Movies/DeleteMovie";
import StatsActor from "./components/Movies/stats/StatsActor";
import { ListGroup, ListGroupItem } from "reactstrap";

/**
 * Includes the paths and routing of the frontend.
 *
 * Routes are oredered in the "decreasing"(topological) way as React interprets
 * /a/b as /a/ if /a/b was not defined above it.
 */
const App = () => {
	return (
		<div className="container">
			<h1> Movies library </h1>
			<Header />
			<BrowserRouter>
				<Routes>
					<Route path="/movies/genres/searchByName">
						<FindGenreByActorOrDirector />
					</Route>
					<Route path="/movies/searchByNames">
						<FindByActorOrDirector />
					</Route>
					<Route path="/movies/sortByPop">
						<SortByPop />
					</Route>
					<Route path="/movies/info">
						<InfoMovies />
					</Route>
					<Route path="/movies/stats">
						<StatsActor />
					</Route>
					<Route path="/movies/:id/delete" component={DeleteMovie} />
					<Route path="/movies/:id" component={ShowSpecificMovie} />
					<Route path="/actors">
						<AllActors />
					</Route>
					<Route path="/movies">
						<AllMovies />
					</Route>
					<Route path="/">
						<h4>Current supported pages:</h4>
						<ListGroup>
							<ListGroupItem color="warning">
								<a href="/actors">All actors</a>
							</ListGroupItem>
							<ListGroupItem color="warning">
								<a href="/movies">All movies</a>
							</ListGroupItem>
							<ListGroupItem color="warning">
								<a href="/movies/searchByNames">
									Search by actor or director
								</a>
							</ListGroupItem>
							<ListGroupItem color="warning">
								<a href="/movies/info">
									Search by title or IMDb URL
								</a>
							</ListGroupItem>
							<ListGroupItem color="warning">
								<a href="movies/sortByPop">
									Movies ranked by user rating
								</a>
							</ListGroupItem>
							<ListGroupItem color="warning">
								<a href="movies/genres/searchByName">
									Genres by actor or director
								</a>
							</ListGroupItem>
							<ListGroupItem color="warning">
								<a href="movies/stats">Statistics of actor</a>
							</ListGroupItem>
						</ListGroup>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
