// import e from 'express';
import React, { Fragment, useState } from "react";
import { Metadata } from "../layout/Metadata";
import "./Search.css";
function Search({ history }) {
  const [keyword, setKeyword] = useState("");

  function searchSubmitHandler(e) {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`./products/${keyword}`);
    } else {
      history.push(`./products`);
    }
  }
  return (
    <Fragment>
      <Metadata title="Search Product-REDSTORE" />
      <form action="" className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search Products ..."
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
}

export default Search;
