import React from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

import {
	saveDataToLocalStorage,
	removeDataFromLocalStorage,
} from "../utils/localStorage";
import { Link } from "react-router-dom";

class MovieDetail extends React.Component {
	state = {
		movieDetails: null,
		addComment: {
			comment: "",
			rate: 1,
			elementId: this.props.match.params.id,
		},
		errMessage: false,
		submittedSize: 0,
		isLoading: true,
		showNotificationMessage: false,

		localStorageArrayName: "userMovieList",
		isAddedToMyList: false,
	};

	componentDidMount = () => {
		this.getMovieDetail();
	};

	handleAddMovieToMyList = () => {
		const { Poster, Title, imdbID } = this.state.movieDetails;

		const { localStorageArrayName } = this.state;

		this.toggleNotificationShow();
		/** If user adds a movie to MYList this movie is stored in local */
		this.setState({ isAddedToMyList: !this.state.isAddedToMyList }, () => {
			//If isAddedToMyList is true (which means user adds the movie to My List)
			// add this movie detail to local storage
			console.log(
				"inside of state function: ",
				this.state.isAddedToMyList
			);
			if (this.state.isAddedToMyList) {
				saveDataToLocalStorage(
					{ Poster, Title, imdbID },
					localStorageArrayName
				);

				//This piece is not necessary since we're using localStorage
				this.props.handleClick(
					Poster,
					Title,
					imdbID,
					this.state.isAddedToMyList
				);
			} else {
				removeDataFromLocalStorage(
					{ Poster, Title, imdbID },
					localStorageArrayName
				);
			}
		});
		console.log("outside of state function:  ", this.state.isAddedToMyList); // this log works first
	};

	getMovieDetail = async () => {
		let idFromSearchBar = this.props.match.params.id;
		const { localStorageArrayName } = this.state;
		try {
			let response = await fetch(
				"http://www.omdbapi.com/?apikey=827e9820&i=" + idFromSearchBar
			);
			let data = await response.json();

			// If the movie is in the localStorage array, this means it added to userMovieList
			// After fetching, if the relevant movie is in the local storage array, isAddedToMyList
			// should be true.
			if (response.ok) {
				setTimeout(() => {
					this.setState(
						{ movieDetails: data, isLoading: false },
						() => {
							if (localStorage[localStorageArrayName]) {
								//Check if the movie is in the local storage array, if it is change state to true
								let isAddedToMyList = JSON.parse(
									window.localStorage.getItem(
										localStorageArrayName
									)
								).some(
									(movie) =>
										movie.imdbID ===
										this.state.movieDetails.imdbID
								);

								this.setState({ isAddedToMyList });
							}
						}
					);
				}, 1000);
			} else {
				this.setState({ isLoading: false, errMessage: true });
			}
		} catch (err) {
			this.setState({ isLoading: false, errMessage: true });
		}
	};
	updateCommentField = (e) => {
		let addComment = { ...this.state.addComment };
		let currentId = e.currentTarget.id;

		addComment[currentId] = e.currentTarget.value;

		this.setState({ addComment });
	};

	submitComment = async (e) => {
		e.preventDefault();
		try {
			let response = await fetch(
				"https://striveschool-api.herokuapp.com/api/comments/",
				{
					method: "POST",
					body: JSON.stringify(this.state.addComment),
					headers: new Headers({
						"Content-Type": "application/json",
						Authorization:
							"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM0YmFlY2I3MDhjMjAwMTc1ZGU4OWIiLCJpYXQiOjE2MDY3MzU5ODksImV4cCI6MTYwNzk0NTU4OX0.OBy4elPjAbg0Ixy1t5_y6_96-WrblBznKTFEu0ZP3_E",
					}),
				}
			);

			if (response.ok) {
				// alert("Comment saved!");
				this.setState({
					addComment: {
						comment: "",
						rate: 1,
						elementId: this.props.match.params.id,
					},
					errMessage: "",
					submittedSize: this.state.submittedSize + 1,
				});
			} else {
				alert("something went wrong");
				let error = await response.json();
			}
		} catch (e) {
			alert("something went wrong");
			console.log(e); // Error
		}
	};

	toggleNotificationShow() {
		this.setState({
			showNotificationMessage: true,
		});

		setTimeout(() => {
			this.setState({
				showNotificationMessage: false,
			});
		}, 5000);
	}

	notificationMessage = () => {
		return (
			<Container
				className='movieList-notification'
				style={{
					display: this.state.showNotificationMessage
						? "block"
						: "none",
				}}>
				<div className='notificaiton-message w3-animate-zoom'>
					<span
						onClick={(e) => {
							e.currentTarget.closest(
								".movieList-notification"
							).style.display = "none";
							this.setState({ showNotificationMessage: false });
						}}
						className='close'>
						&times;
					</span>
					<p>
						Movie
						{this.state.isAddedToMyList
							? " added to "
							: " removed from "}
						<Link style={{ textDecoration: "none" }} to='/myList'>
							<strong style={{ color: "white" }}>My List</strong>
						</Link>
					</p>
				</div>
			</Container>
		);
	};
	render() {
		return (
			<>
				{this.notificationMessage()}
				{this.state.isLoading && (
					<Spinner
						style={{ marginLeft: "50%" }}
						animation='grow'
						variant='danger'
					/>
				)}

				{this.state.errMessage && (
					<div className='d-flex justify-content-center align-items-center mt-3'>
						<Alert variant='danger'>
							&#9762; Something went wrong!
							<strong> Refresh the page </strong>
						</Alert>
					</div>
				)}
				{this.state.movieDetails && !this.state.errMessage && (
					<Container className='detail-page'>
						<h1 className='text-center mb-4'>
							{this.state.movieDetails.Title}
						</h1>

						<hr />
						<Row className='mb-5'>
							<Col md={4}>
								<img
									src={this.state.movieDetails.Poster}
									alt={this.state.movieDetails.Title}
								/>
							</Col>
							<Col md={8}>
								<Row className='movie-about ml-5 mt-2'>
									<div className='d-flex justify-content-between'>
										<Col className='mb-2' md={8}>
											<strong>Actors </strong>
											<p>
												{this.state.movieDetails.Actors}
											</p>
										</Col>
										<div className='d-flex justify-content-center'>
											<svg
												style={{
													color: "orange",
													marginLeft: "40px",
													marginTop: "20px",
													transform: "scale(1.6)",
												}}
												aria-hidden='true'
												focusable='false'
												data-prefix='fas'
												data-icon='star'
												className='svg-inline--fa fa-star fa-w-18'
												role='img'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 576 512'>
												<path
													fill='currentColor'
													d='M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z'></path>
											</svg>
											<p
												style={{
													color: "white",
													fontSize: "xx-large",
													marginLeft: "10px",
												}}>
												{
													this.state.movieDetails
														.imdbRating
												}{" "}
											</p>
											<span
												style={{
													color: "gray",
													marginTop: "17px",
												}}>
												|10
											</span>
										</div>
									</div>

									<Col className='mb-2' md={12}>
										<Row className='d-flex justify-content-between'>
											<Col md={8}>
												<strong>Director </strong>
												<p>
													{" "}
													{
														this.state.movieDetails
															.Director
													}
												</p>
											</Col>
											<Col md={4}>
												{this.state.isAddedToMyList ? (
													<FontAwesomeIcon
														onClick={
															this
																.handleAddMovieToMyList
														}
														style={{
															color: "green",
														}}
														className='fa-3x add-list-icon ml-5'
														icon={faCheck}
													/>
												) : (
													<FontAwesomeIcon
														onClick={
															this
																.handleAddMovieToMyList
														}
														className='fa-3x add-list-icon ml-5'
														icon={faPlus}
													/>
												)}
											</Col>
										</Row>
									</Col>

									<Col className='mb-2' md={12}>
										<strong>Release Date </strong>
										<p>
											{" "}
											{this.state.movieDetails.Released}
										</p>
									</Col>
									<Col className='mb-2' md={12}>
										<strong>Language </strong>
										<p>
											{" "}
											{this.state.movieDetails.Language}
										</p>
									</Col>
									<Col className='mb-2' md={12}>
										<strong>Genre </strong>
										<p> {this.state.movieDetails.Genre}</p>
									</Col>
									<Col className='mb-2' md={12}>
										<strong>Production </strong>
										<p>
											{" "}
											{this.state.movieDetails.Production}
										</p>
									</Col>
									<Col className='mb-2' md={12}>
										<strong>Duration </strong>
										<p>
											{" "}
											{this.state.movieDetails.Runtime}
										</p>
									</Col>
								</Row>
							</Col>
						</Row>
						<hr />
						<Row>
							<Col className='mr-5' md={4}>
								<AddComment
									addComment={this.state.addComment}
									onChangeElement={this.updateCommentField}
									onSubmitComment={this.submitComment}
									movieId={this.props.match.params.id}
								/>
							</Col>

							<Col md={6}>
								<CommentList
									submittedSize={this.state.submittedSize}
									movieId={this.props.match.params.id}
								/>
							</Col>
						</Row>
					</Container>
				)}
			</>
		);
	}
}

export default MovieDetail;
