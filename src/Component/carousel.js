import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CarouselCom(props) {
  let data = props.data;
  console.log(data);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="carousel">
      <div className="carousel-header">
        <p>Product Name</p>
      </div>
      {data && (
        <Carousel responsive={responsive}>
          {data.map((element, i) => (
            <div key={i} className="carousel-item">
              <div className="carousel-child">
                <div className="carousel-item-header">
                  <div className="carousel-img">
                    <img src={element.image} alt="image" />
                  </div>
                  <div className="carousel-data">
                    <strong>
                      <p>Name: {element.product_name}</p>
                    </strong>
                    <p>Brand Name: {element.brand_name}</p>
                    <p>$ {element.price}</p>
                  </div>
                </div>
                <div className="carousel-item-body">
                  <div>
                    <p>State: {element.address.state}</p>
                    <p> City: {element.address.city}</p>
                    <p>Date: {element.date}</p>
                  </div>
                </div>
                <div className="carousel-item-footer">
                  <p>{element.discription}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default CarouselCom;
