import "./index.css";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

// const FeaturedSearch = ({ fetchMoreData, isLoading, featured }) => {
//   window.addEventListener("scroll", function () {
//     if (
//       window.innerHeight + document.documentElement.scrollTop !==
//       document.documentElement.offsetHeight
//     ) {
//       fetchMoreData();
//     }
//   });

//   return (
//     <div className="photo">
//       <p>Featured GIFs</p>
//       <div className="gallery">
//             {featured.map((item) => {
//               return (
//         <div className="column">
//           <div className="gifList">
//                 <img
//                   key={item.id}
//                   src={item.media_formats.tinygif.url}
//                   width={item.media_formats.tinygif.dims[0]}
//                   height={item.media_formats.tinygif.dims[1]}
//                 />
//           </div>
//         </div>
//                 );
//               })}
//       </div>
//       {isLoading ? <p>Loading...</p> : null}
//     </div>
//   );
// };

// export default FeaturedSearch;

const FeaturedSearch = ({ fetchMoreData, featured }) => {
  return (
    <div className="photo">
      <InfiniteScroll
        dataLength={featured.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="gallery">
          {featured.map((item) => {
            return (
              <div className="container" key={item.id}>
                <img
                  src={item.media[0].tinygif.url}
                  width={item.media[0].tinygif.dims[0]}
                  height={item.media[0].tinygif.dims[1]}
                  alt={item.content_description}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default FeaturedSearch;
