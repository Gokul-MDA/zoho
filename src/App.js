import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const FeaturedSearch = React.lazy(() => import("./components/FeaturedSearch"));
const Search = React.lazy(() => import("./components/Search"));
const TrendingSearch = React.lazy(() => import("./components/TrendingSearch"));

function App() {
  const [trending, setTrending] = useState([]);
  const [query, setQuery] = useState();
  const [searchItem, setSearchItem] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextData, setNextData] = useState("");

  const url = "https://g.tenor.com/v1";
  const apiKey = "LIVDSRZULELA";

  useEffect(() => {
    axios
      .get(`${url}/trending?key=${apiKey}&limit=10`)
      .then((response) => setTrending(response.data.results));
  }, []);

  console.log(trending);

  const handleSearch = () => {
    axios
      .get(
        `${url}/search?key=${apiKey}&client_key=tenor_web&locale=en&q=${query}&limit=20&pos=${nextData}`
      )
      .then((response) => {
        setSearchItem(response.data.results);
        setNextData(response.data.next);
      });
  };

  useEffect(() => {
    fetchMoreFeaturedData();
  }, []);

  const fetchMoreFeaturedData = () => {
    setIsLoading(true);
    axios
      .get(
        `${url}/featured?key=${apiKey}&client_key=tenor_web&limit=20&pos=${nextData}`
      )
      .then((response) => {
        console.log(response);
        setFeatured([...featured, ...response.data.results]);
        setNextData(response.data.next);
        setIsLoading(false);
      });
  };

  const fetchMoreSearchData = () => {
    setIsLoading(true);
    axios
      .get(
        `${url}/search?key=${apiKey}&client_key=tenor_web&locale=en&q=${query}&limit=20&contentfilter=low&pos=${nextData}`
      )
      .then((response) => {
        setSearchItem([...featured, ...response.data.results]);
        setNextData(response.data.next);
        setIsLoading(false);
      });
  };

  const loadFunction = query ? fetchMoreSearchData : fetchMoreFeaturedData;
  const data = query ? searchItem : featured;

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Search
            query={query}
            setQuery={setQuery}
            handleSearch={handleSearch}
          />
          <TrendingSearch
            trending={trending}
            setQuery={setQuery}
            handleSearch={handleSearch}
          />
          <Routes>
            {/* <Route path="/" element={<SearchBar />} /> */}
            <Route
              path="/"
              element={
                <FeaturedSearch fetchMoreData={loadFunction} featured={data} />
              }
            />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
