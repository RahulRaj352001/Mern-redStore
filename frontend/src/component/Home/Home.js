import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import Product from "./ProductCard";
import { Metadata } from "../layout/Metadata";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
export default function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="REDSTORE" />
          <div className="banner">
            <p>Welcome To REDSTORE</p>
            <h1>FIND AMAZING PRODUCT FOR YOU</h1>
            <a href="#container">
              <button>
                scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Product</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => {
                return <Product product={product} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
