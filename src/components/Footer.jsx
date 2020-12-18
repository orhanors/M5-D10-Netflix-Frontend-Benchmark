import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faInstagram,
	faTwitterSquare,
	faFacebookSquare,
} from "@fortawesome/free-brands-svg-icons";
import { Col, Container, Row, Button } from "react-bootstrap";

import { withRouter } from "react-router-dom";
export class Footer extends Component {
	render() {
		return (
			<>
				{" "}
				{this.props.location.pathname !== "/register" && (
					<div className='footer__container'>
						<Container className='px-4 my-5'>
							<Row>
								<Col>
									<Row className='ml-1'>
										<h6 className='mr-2'>
											<FontAwesomeIcon
												icon={faFacebookSquare}
											/>
										</h6>
										<h6 className='mr-2'>
											<FontAwesomeIcon
												icon={faInstagram}
											/>
										</h6>
										<h6 className='mr-2'>
											<FontAwesomeIcon
												icon={faTwitterSquare}
											/>
										</h6>
									</Row>
									<h6>Audio & Subtitles</h6>
									<h6>Media Centre</h6>
									<h6>Privacy</h6>
									<h6>Contact Us</h6>
									<Button className='my-2'>
										{" "}
										Service Code
									</Button>
									<p>1997-2020 Netflix, Inc.</p>
								</Col>
								<Col>
									<h6>Audio Description</h6>
									<h6>Investor Relations</h6>
									<h6>Legal Notices</h6>
								</Col>
								<Col>
									<h6>Help Centre</h6>
									<h6>Jobs</h6>
									<h6>Cookies Preferences</h6>
								</Col>
							</Row>
						</Container>
					</div>
				)}
			</>
		);
	}
}

export default withRouter(Footer);
