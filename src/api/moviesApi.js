import axios from "axios";
export async function getMovies() {
	try {
		const response = await fetch(process.env.REACT_APP_MOVIES_API);
		console.log("response", response);
		if (response.ok) {
			const data = await response.json();
			console.log("movies:", data);
			return data;
		} else {
			const err = await response.json();
			return err;
		}
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function postMovie(movie) {
	try {
		const response = await fetch(process.env.REACT_APP_MOVIES_API, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(movie),
		});
		if (response.ok) {
			alert("successfully added");
			let result = await response.json();
			return result;
		} else {
			alert("something wrong");
			let error = await response.json();
			return error;
		}
	} catch (error) {
		return error;
	}
}

export async function removeMovie(movieId) {
	try {
		const response = await fetch(
			`${process.env.REACT_APP_MOVIES_API + movieId}`,
			{
				method: "DELETE",
			}
		);
		if (response.ok) {
			return "Movie Deleted";
		} else {
			return "Something went wrong";
		}
	} catch (error) {
		return error;
	}
}

export async function postMovieImage(movieId, file) {
	try {
		let formData = new FormData();
		formData.append("poster", file, file.name);
		const response = await fetch(
			`${process.env.REACT_APP_MOVIES_API + movieId}/upload`,
			{ method: "POST", body: formData }
		);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const error = await response.json();
			return error;
		}
	} catch (error) {
		return error;
	}
}
