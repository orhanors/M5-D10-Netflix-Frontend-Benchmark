import React from "react";
import { Form, Button, Container } from "react-bootstrap";
//
const AddMovieForm = (props) => {
	return (
		<div className='product-form'>
			<Container>
				<Form onSubmit={props.onHandleSubmit}>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control
							id='Title'
							type='text'
							placeholder='Name'
							value={props.movie.name}
							onChange={props.fillForm}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Year</Form.Label>
						<Form.Control
							id='Year'
							type='text'
							placeholder='Year'
							value={props.movie.description}
							onChange={props.fillForm}
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Type</Form.Label>
						<Form.Control
							id='Type'
							type='text'
							placeholder='Movie Type'
							value={props.movie.brand}
							onChange={props.fillForm}
						/>
					</Form.Group>

					<Form.Group>
						<Form.File
							id='Poster'
							label='Movie Poster'
							onChange={props.imageForm}
						/>
					</Form.Group>

					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</Container>
		</div>
	);
};

export default AddMovieForm;
