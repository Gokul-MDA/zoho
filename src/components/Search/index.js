import React, { useState, useEffect, useRef } from "react";
import whiteLogo from "../../assets/tenor-logo-white.svg";
import logo from "../../assets/tenor-logo.svg";
import { Link } from "react-router-dom";
import "./index.css";

const Search = ({ query, setQuery, handleSearch }) => {
  const searchContainterRef = useRef(null);
  const [isSearchBarTop, setSearchBarTop] = useState(false);

  useEffect(() => {
    if (searchContainterRef && searchContainterRef.current) {
      document.addEventListener("scroll", addScrollEventListener, false);
    }
    return () => {
      document.removeEventListener("scroll", addScrollEventListener);
    };
  }, []);

  const addScrollEventListener = () => {
    let offsetTopForSearchContainer = searchContainterRef.current.offsetTop;
    let currentPosition =
      offsetTopForSearchContainer - document.documentElement.scrollTop;

    if (
      currentPosition <= 0 &&
      document.documentElement.scrollTop > currentPosition
    ) {
      setSearchBarTop(true);

      return;
    }

    document.documentElement.scrollTop = offsetTopForSearchContainer;
    setSearchBarTop(false);
  };

  return (
    <div>
      <div className="navbar">
        <div className="container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
      </div>
      <div
        ref={searchContainterRef}
        className={`searchbar-container ${isSearchBarTop ? "set-top" : ""}`}
      >
        <div className="search-elements">
          <div className="image-container">
            <Link to="/">
              <img
                src={whiteLogo}
                alt="tenor white logo"
                width="80"
                height="22"
              />
            </Link>
          </div>
          <div className="search-box-container">
            <form
              className="search-bar"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <input
                type="text"
                name="search"
                placeholder="Search you want"
                defaultValue={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-box"
              />
              <span className="iconfont-search"></span>
            </form>
            <span className="search-icon"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
