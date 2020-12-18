import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.css";
import React, { useState, useEffect } from "react";
import "./App.css";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import MovieDetail from "./components/MovieDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserMovieList from "./components/UserMovieList";
import Register from "./components/Register";
function App() {
	//Everytime user clicks the addList button in MovieDetails Page,this array takes Movie data
	const [userMovies, setUserMovies] = useState([]);

	const getUserMovie = (poster, title, id, isAdded) => {
		setUserMovies((userMovies) => [
			...userMovies,
			{ poster, title, id, isAdded },
		]);
	};

	return (
		<div className='App'>
			<Router>
				<NavBar />

				<Route path='/' exact component={Home} />
				<Route
					path='/details/:id/'
					render={(props) => (
						<MovieDetail handleClick={getUserMovie} {...props} />
					)}
				/>
				<Route
					path='/myList'
					exact
					render={(props) => (
						<UserMovieList userMovieList={userMovies} {...props} />
					)}
				/>
				<Route path='/register' exact component={Register} />
				<Footer />
			</Router>
		</div>
	);
}

export default App;
