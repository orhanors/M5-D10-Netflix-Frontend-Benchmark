export function saveDataToLocalStorage(data, storageArrayName) {
	let allMovies = [];
	// Parse the serialized data back into an aray of objects
	if (localStorage[storageArrayName]) {
		allMovies = JSON.parse(window.localStorage.getItem(storageArrayName));
	}

	// Push the new data (whether it be an object or anything else) onto the array
	allMovies.push(data);
	// Alert the array value
	// Re-serialize the array back into a string and store it in localStorage
	window.localStorage.setItem(storageArrayName, JSON.stringify(allMovies));
}
//
export function removeDataFromLocalStorage(data, storageArrayName) {
	let allMovies = [];

	if (localStorage[storageArrayName]) {
		allMovies = JSON.parse(window.localStorage.getItem(storageArrayName));
		allMovies = allMovies.filter((movie) => movie.imdbID !== data.imdbID);

		window.localStorage.setItem(
			storageArrayName,
			JSON.stringify(allMovies)
		);
	}
}
