import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import './home.css'
export default function Product({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.2)",
    activeColor: "tomato",
    size:window.innerWidth<600?1:20,
    value: product.ratings,
   
    isHalf: true,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="" />
      <p>{product.name}</p>
      <div>
      
        <ReactStars {...options} /> <span>({product.numofReviews}Review)</span>
      </div>
      <span>{`$${product.price}`}</span>
      
    </Link>
  );
}
