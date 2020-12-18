import React from "react";
import { Carousel, Button } from "react-bootstrap";

class JumboCarousel extends React.Component {
  state = {
    index: 0,
  };

  handleSelect = (e) => {
    return this.setState({
      index: { e },
    });
  };

  render() {
    return (
      <Carousel>
        <Carousel.Item style={{ height: "50vh", backgroundColor: "black" }}>
          <img
            style={{
              opacity: "0.5",
              height: "400px",
              width: "800px",
              objectFit: "cover",
            }}
            className="d-block w-100"
            src="https://miro.medium.com/max/1200/0*oBDno6Kr63I8r4li"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>The Old Guard</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Button variant="danger">Watch now</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: "50vh", backgroundColor: "black" }}>
          <img
            style={{
              opacity: "0.5",
              height: "400px",
              width: "800px",
              objectFit: "cover",
            }}
            className="d-block w-100"
            src="https://i.ytimg.com/vi/gwcO4PRASDQ/maxresdefault.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Hunter killer</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Button variant="danger">Watch now</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: "50vh", backgroundColor: "black" }}>
          <img
            style={{
              opacity: "0.5",
              height: "400px",
              width: "800px",
              objectFit: "cover",
            }}
            className="d-block w-100"
            src="https://magazinepragma.com/wp-content/uploads/2020/11/il-talento-del-calabrone-cover.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Il talento del calabrone</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            <Button variant="danger">Watch now</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default JumboCarousel;
