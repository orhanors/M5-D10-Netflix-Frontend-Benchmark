import React from "react";
import MovieList from "./MovieList";
import JumboCarousel from "./JumboCarousel";
class Home extends React.Component {
	state = {
		keyWord: "",
		isTyped: false,
	};

	HandleSearchQuery = (query) => {
		if (query.length >= 3) {
			this.setState({ keyWord: query, isTyped: true });
		} else {
			this.setState({ keyWord: "", isTyped: false });
		}
	};

	render() {
		return (
			<>
				<JumboCarousel />
				<div className='form-inline my-2 my-lg-0'>
					{/* searchbar */}
					<div className='form__group field mb-5 container mt-5 d-flex justify-content-center'>
						<input
							id='searchBar'
							type='input'
							className='form__field'
							placeholder='Name'
							name='name'
							id='name'
							required
							onChange={(e) => {
								this.HandleSearchQuery(e.target.value);
							}}
						/>
						<label htmlFor='name' className='form__label'>
							Search
						</label>
					</div>
				</div>
				{this.state.isTyped ? (
					<MovieList query={this.state.keyWord} />
				) : (
					<>
						<MovieList query='batman' />
						<MovieList query='superman' />
						<MovieList query='hulk' />
					</>
				)}
			</>
		);
	}
}

export default Home;
