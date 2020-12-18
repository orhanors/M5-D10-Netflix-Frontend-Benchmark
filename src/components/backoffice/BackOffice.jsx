import React, { useState, useEffect } from "react";
import { Button, Container, Image, Spinner, Table } from "react-bootstrap";
import {
	getMovies,
	postMovieImage,
	postMovie,
	removeMovie,
} from "../../api/moviesApi";

import AddMovieForm from "./AddMovieForm";

const BackOffice = (props) => {
	const [movies, setMovies] = useState([]);
	const [movie, setMovie] = useState({
		Title: "",
		Year: "",
		Type: "",
	});
	const [image, setImage] = useState(null);

	const [submittedSize, setSubmittedSize] = useState(0);

	const [loading, setLoading] = useState(false);
	const [update, setUpdate] = useState(null);
	useEffect(() => {
		fetchMovies();
	}, []);

	const fetchMovies = async () => {
		setLoading(true);
		const movies = await getMovies();
		console.log(movies, "mohfgvdoası");
		setMovies(movies);
		setLoading(false);
	};

	const addProduct = async (e) => {
		e.preventDefault();
		let postedMovie = await postMovie(movie);
		const postImg = await postMovieImage(postedMovie.imdbID, image);

		setSubmittedSize(submittedSize + 1);
		console.log(postedMovie.errors);
	};

	const fillForm = (e) => {
		let currentId = e.currentTarget.id;
		let newMovie = { ...movie };
		newMovie[currentId] = e.currentTarget.value;
		setMovie(newMovie);
	};

	const fillImageForm = (e) => {
		console.log(e.target.files);
		setImage(e.target.files[0]);
	};

	const deleteProduct = async (e) => {
		let id = e.target.id;
		console.log(e.currentTarget);
		await removeMovie(id);
		setSubmittedSize(submittedSize + 1);
	};

	return (
		<div className='back-office'>
			<h1 className='back-office-title text-center my-3'>
				Netflix Back Office
			</h1>

			<AddMovieForm
				imageForm={fillImageForm}
				movie={movie}
				fillForm={fillForm}
				onHandleSubmit={addProduct}
			/>

			<div className='product-table mt-3'>
				<Container>
					<Table striped bordered hover variant='dark'>
						<thead>
							<tr>
								<th>No</th>
								<th>Poster</th>
								<th>Title</th>
								<th>Year</th>
								<th>Type</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								<Spinner animation='border' role='status'>
									<span className='sr-only'>Loading...</span>
								</Spinner>
							) : (
								<>
									{movies &&
										movies.map((movie, index) => {
											return (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>
														<Image
															style={{
																width: "50px",
																height: "50px",
															}}
															src={movie.Poster}
														/>
													</td>
													<td>{movie.Title}</td>
													<td>{movie.Year}</td>
													<td>{movie.Type}</td>
													<td>Actions</td>

													<td>
														<Button
															id={movie._id}
															onClick={(e) =>
																deleteProduct(e)
															}
															variant='danger'>
															Remove
														</Button>
													</td>
												</tr>
											);
										})}
								</>
							)}
						</tbody>
					</Table>
				</Container>
			</div>
		</div>
	);
};

export default BackOffice;
