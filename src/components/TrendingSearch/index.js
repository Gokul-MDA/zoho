import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const TrendingSearch = ({ trending, setQuery, handleSearch }) => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }

  const setting = {
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="trending">
      <Slider {...setting}>
        {trending.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => {
                setQuery(item.content_description);
                handleSearch();
              }}
            >
              <img
                src={item.media[0].tinygif.url}
                alt={item.content_description}
                className="trendingImg"
              />
              <p>{item.content_description}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default TrendingSearch;
