import React from "react";
import { Col, Row, Form, Container, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/netflix-logo.png";

/**Email - Required - Should be an email field
Password - Required - Should contain at least 8 chars, 1 digit, 1 letter
Year of Birth - Required - from 1910+
Street Address - Required
City - Required
Postal Code - Required - Numeric 5 digits
Credit card - XXXX-XXXX-XXXX-XXXX (EXTRA) */
class Register extends React.Component {
	state = {
		user: {
			name: "",
			surname: "",
			email: "",
			password: "",
			birthDate: "",
			address: "",
			city: "",
			postalCode: 0,
			creditCard: {
				cname: "",
				ccnum: "",
				expmonth: "",
				expyear: "",
				cvv: "",
			},
		},
		// isFormFilled: "",
		pageNumber: 1,
	};

	handleFormValueChange = (e) => {
		if (this.state.pageNumber !== 3) {
			//CreditCard page will be different
			let user = { ...this.state.user };

			let currentValue = e.currentTarget.value;

			let id = e.currentTarget.id;

			user[id] = currentValue;

			this.setState({ user });
		} else {
			//credit card
			let user = { ...this.state.user };

			let currentValue = e.currentTarget.value;
			let id = e.currentTarget.id;

			user.creditCard[id] = currentValue;

			this.setState({ user });
		}
	};

	handleNextPage = (e) => {
		this.setState({ pageNumber: this.state.pageNumber + 1 });
	};

	handlePreviousPage = (e) => {
		this.setState({ pageNumber: this.state.pageNumber - 1 });
	};

	isFormCompleted() {
		const { user } = this.state;

		let isFilled;
		for (let info in user) {
			if (info !== "creditCard") {
				isFilled = user[info].length >= 3 === true;
				console.log(isFilled);
				console.log(user[info]);
			}
		}
		// if (isFilled) {
		// 	this.setState({ isFormFilled: true });
		// }
		return isFilled;
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	if (prevState.user !== this.state.user) {
	// 		this.isFormCompleted();
	// 	}
	// }
	render() {
		return (
			<div className='register-page'>
				<nav className='navbar navbar-expand-lg navbar-dark'>
					<a className='navbar-brand my-1 mx-4' href='index.html'>
						<Link to='/'>
							<img src={logo} alt='logo' width='200' />
						</Link>
					</a>
				</nav>
				<Container className='register-form mb-5'>
					<Row>
						<Col mb={12} className='text-center'>
							<h1 className='mt-3'>REGISTER</h1>
							<hr />
							{this.state.pageNumber !== 4 && (
								<h2 style={{ color: "gray" }}>
									<span style={{ color: "whitesmoke" }}>
										{this.state.pageNumber}
									</span>
									\3
								</h2>
							)}
						</Col>
					</Row>
					<Form>
						<Row className='mt-5 d-flex justify-content-center '>
							{this.state.pageNumber === 1 && (
								<div className='register-page1'>
									<Col md={12}>
										<Form.Group>
											<Form.Label htmlFor='name'>
												<i class='fa fa-user'></i> Name
											</Form.Label>

											<Form.Control
												type='text'
												name='name'
												id='name'
												placeholder='Name'
												value={this.state.user.name}
												onChange={
													this.handleFormValueChange
												}
												required
											/>
										</Form.Group>
									</Col>

									<Col md={12}>
										<Form.Group>
											<Form.Label htmlFor='surname'>
												<i class='fa fa-user'></i>{" "}
												Surname
											</Form.Label>

											<Form.Control
												type='text'
												name='surname'
												id='surname'
												placeholder='surname'
												value={this.state.user.surname}
												onChange={
													this.handleFormValueChange
												}
												required
											/>
										</Form.Group>
									</Col>

									<Col md={12}>
										<Form.Group>
											<Form.Label htmlFor='email'>
												<i class='fa fa-envelope'></i>{" "}
												E-mail
											</Form.Label>

											<Form.Control
												type='email'
												name='email'
												id='email'
												placeholder='name@example.com'
												value={this.state.user.email}
												onChange={
													this.handleFormValueChange
												}
												required
											/>
										</Form.Group>
									</Col>

									<Col md={12}>
										<Form.Group>
											<Form.Label htmlFor='password'>
												Password
											</Form.Label>

											<Form.Control
												type='password'
												name='password'
												id='password'
												placeholder='Password'
												value={this.state.user.password}
												onChange={
													this.handleFormValueChange
												}
												required
											/>
										</Form.Group>
									</Col>
								</div>
							)}

							{this.state.pageNumber === 2 && (
								<div className='register-page2'>
									<Col md={12}>
										<Form.Group>
											<Form.Label htmlFor='birthDate'>
												Birth Date
											</Form.Label>

											<Form.Control
												type='date'
												name='birthDate'
												id='birthDate'
												placeholder='Birth Date'
												value={
													this.state.user.birthDate
												}
												onChange={
													this.handleFormValueChange
												}
												required
											/>
										</Form.Group>
									</Col>

									<Col md={12}>
										<Form.Group>
											<Form.Label htmlFor='address'>
												Address
											</Form.Label>

											<Form.Control
												as='textarea'
												row={50}
												col={3}
												name='address'
												id='address'
												placeholder='Address'
												value={this.state.user.address}
												onChange={
													this.handleFormValueChange
												}
												required
											/>
										</Form.Group>
									</Col>

									<Col md={12}>
										<Form.Group>
											<Form.Label htmlFor='city'>
												City
											</Form.Label>

											<Form.Control
												type='text'
												name='city'
												id='city'
												placeholder='City'
												value={this.state.user.city}
												onChange={
													this.handleFormValueChange
												}
												required
											/>
										</Form.Group>
									</Col>

									<Col md={12}>
										<Form.Group>
											<Form.Label htmlFor='postalCode'>
												Postal Code
											</Form.Label>

											<Form.Control
												type='number'
												name='postalCode'
												id='postalCode'
												placeholder='Postal Code'
												value={
													this.state.user.postalCode
												}
												onChange={
													this.handleFormValueChange
												}
												required
											/>
										</Form.Group>
									</Col>
								</div>
							)}

							{this.state.pageNumber === 3 && (
								<div className='col-50 credit-payment'>
									<h3>Payment</h3>

									<label htmlFor='fname'>
										Accepted Cards
									</label>
									<div className='icon-container'>
										<i
											className='fa fa-cc-visa mr-2'
											style={{ color: "navy" }}></i>
										<i
											className='fa fa-cc-amex mr-2'
											style={{ color: "blue" }}></i>
										<i
											className='fa fa-cc-mastercard mr-2'
											style={{ color: "red" }}></i>
										<i
											className='fa fa-cc-discover'
											style={{ color: "orange" }}></i>
									</div>
									<h4>(Not Required for Free Trial)</h4>
									<label htmlFor='cname'>Name on Card</label>

									<input
										type='text'
										id='cname'
										name='cardname'
										placeholder='John More Doe'
										value={this.state.user.creditCard.cname}
										onChange={this.handleFormValueChange}
									/>
									<label htmlFor='ccnum'>
										Credit card number
									</label>
									<input
										type='text'
										id='ccnum'
										name='cardnumber'
										placeholder='1111-2222-3333-4444'
										value={this.state.user.creditCard.ccnum}
										onChange={this.handleFormValueChange}
									/>
									<label htmlFor='expmonth'>Exp Month</label>
									<input
										type='text'
										id='expmonth'
										name='expmonth'
										placeholder='September'
										value={
											this.state.user.creditCard.expmonth
										}
										onChange={this.handleFormValueChange}
									/>
									<div className='row'>
										<div className='col-40 mr-2'>
											<label htmlFor='expyear'>
												Exp Year
											</label>
											<input
												type='text'
												id='expyear'
												name='expyear'
												placeholder='2018'
												value={
													this.state.user.creditCard
														.expyear
												}
												onChange={
													this.handleFormValueChange
												}
											/>
										</div>
										<div className='col-0'>
											<label htmlFor='cvv'>CVV</label>
											<input
												type='text'
												id='cvv'
												name='cvv'
												placeholder='352'
												value={
													this.state.user.creditCard
														.cvv
												}
												onChange={
													this.handleFormValueChange
												}
											/>
										</div>
									</div>
								</div>
							)}

							{!this.isFormCompleted() &&
								this.state.pageNumber === 4 && (
									<div className='d-flex justify-content-center align-items-center mt-3'>
										<Alert variant='danger'>
											&#9762; There are some empty parts!
											<strong>
												{" "}
												Fill all the required places
											</strong>{" "}
										</Alert>
									</div>
								)}
							{this.state.pageNumber === 4 &&
								this.isFormCompleted() && (
									<div className='user-info'>
										<h1> User Info </h1>
										<div>
											{this.isFormCompleted()}
											<strong>Name: </strong>
											{this.state.user.name}
										</div>

										<div>
											<strong>Surname: </strong>
											{this.state.user.surname}
										</div>

										<div>
											<strong>Email: </strong>
											{this.state.user.email}
										</div>

										<div>
											<strong>Birth Date: </strong>
											{this.state.user.birthDate}
										</div>

										<div>
											<strong>Address: </strong>
											{this.state.user.address}
										</div>

										<div>
											<strong>City: </strong>
											{this.state.user.city}
										</div>

										<div>
											<strong>Postal Code: </strong>
											{this.state.user.postalCode}
										</div>

										<h2>Credit Card Info</h2>
										<div>
											<strong>Card Name: </strong>
											{this.state.user.creditCard.cname}
										</div>
										<div>
											<strong>Card Number: </strong>
											{this.state.user.creditCard.ccnum}
										</div>
										<div>
											<strong>Expiration Month: </strong>
											{
												this.state.user.creditCard
													.expmonth
											}
										</div>
										<div>
											<strong>Expiration Year: </strong>
											{this.state.user.creditCard.expyear}
										</div>
										<div>
											<strong>CVV: </strong>
											{this.state.user.creditCard.cvv}
										</div>
									</div>
								)}
						</Row>
					</Form>
					<Row>
						<Col className='d-flex justify-content-center mt-3 mb-5'>
							<Button
								disabled={
									this.state.pageNumber === 1
										? "disabled"
										: ""
								}
								className='back secondary mr-5'
								variant='secondary'
								onClick={this.handlePreviousPage}>
								&laquo; Previous
							</Button>

							<Button
								disabled={
									this.state.pageNumber === 4
										? "disabled"
										: ""
								}
								className={
									this.state.pageNumber === 4
										? "next secondary d-none"
										: "next secondary "
								}
								variant='secondary'
								onClick={this.handleNextPage}>
								Next &raquo;
							</Button>

							{this.state.pageNumber === 4 &&
								this.isFormCompleted() && (
									<Link to='/'>
										<Button variant='success'>
											Submit
										</Button>
									</Link>
								)}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Register;
