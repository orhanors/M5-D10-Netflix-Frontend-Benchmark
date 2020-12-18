import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class SingleMovie extends React.Component {
	state = {
		clicked: false,
	};

	render() {
		return (
			<div className='col mb-5 mb-lg-0 pr-1 no-gutters mx-0'>
				<span className='overlay-icons'>
					<img
						alt={this.props.Movie.Title}
						src={this.props.Movie.Poster}
						className='img-fluid thumbnails'
					/>
					<Link to={`/details/${this.props.Movie.imdbID}`}>
						<Button variant='info' style={{ display: "none" }}>
							Details
						</Button>
					</Link>
				</span>
			</div>
		);
	}
}

export default SingleMovie;
