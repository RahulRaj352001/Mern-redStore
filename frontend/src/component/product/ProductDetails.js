import React, { Fragment, useEffect } from "react";
import Cerousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";

import { getProductDetails } from "../../actions/productAction";
import "./productDetails.css";
import ReviewCard from "./ReviewCard";
import ReactStars from "react-rating-stars-component";
import { Metadata } from "../layout/Metadata";
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, alert, error]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.2)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 20,
    value:product.ratings,
    isHalf: true,
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <Metadata title={`${product.name}--REDSTORE`}/>
          <div className="ProductDetails">
            <div>
              <Cerousel>
                {product.images &&
                  product.images.map((item, i) => {
                    return (
                      <img
                        className="CarouselImage"
                        ket={item.url}
                        src={item.url}
                        alt={`${i} slide`}
                      />
                    );
                  })}
              </Cerousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numofReviews} Review)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`$${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>{" "}
                  <button> add to cart</button>
                </div>
                <p>
                  status:{" "}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "outofStock" : "instock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button className="submitReview"> Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => {
                  return <ReviewCard review={review} />;
                })}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
