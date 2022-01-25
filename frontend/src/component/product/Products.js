import React, { Fragment, useEffect, useState } from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import ProductCard from "../Home/ProductCard";
import { Slider, Typography } from "@material-ui/core";
import Pagination from "react-js-pagination";
import { Metadata } from "../layout/Metadata";

const categories = ["Laptop", "footwaer", "bootom", "camera", "mobile", "Tops"];

export default function Products({ match }) {
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ratings, setRatings] = useState(0)

  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);
  const keyword = match.params.keyword;
  const alert = useAlert();
  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
    console.log(currentPage);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
     if (error) {
         alert.error(error)
         dispatch(clearError())
     }

    dispatch(getProduct(keyword, currentPage, price, category,ratings));
  }, [dispatch, keyword, price, currentPage, category,ratings,alert,error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <Metadata title="PRODUCTS-REDSTORE"/>
          <div>
            <h2 className="productsHeading">Products</h2>
          </div>
          <div className="products">
            {products &&
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })}
          </div>

          <div className="FilterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={0}
              max={25000}
              aria-labelledby="range-slider"
            />
            <Typography>Categories</Typography>
            <ul className="categories">
              {categories.map((category1) => (
                <li
                  className="category-link"
                  key={category1}
                  onClick={() => setCategory(category1)}
                >
                  {category1}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Rating Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="range-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              ></Slider>
            </fieldset>
          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPagetext="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
