import { useState } from "react";
import "./FrontPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CategoryContainer from "./CategoryContainer";

const RetroBeats = ({
  changePage,
  setDecade,
  setCategories,
  setSongInfo,
  setPageNumber,
  getThumbnail,
  recommendedSongs,
  setReturnState,
  searchQuery,
  setSearchQuery,
  handleQuerySubmit,
}) => {
  const [activeDecade, setActiveDecade] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const showCategories = (decade) => {
    setActiveDecade(decade);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = () => {
    if (selectedCategories.length > 0) {
      setDecade(activeDecade);
      setCategories(selectedCategories);
      changePage(1);
      setReturnState("Search Results");
    } else {
      return;
    }
  };

  const decadeTimes = [1960, 1970, 1980, 1990];
  const categoriesList = [
    { name: "rock", id: "rock" },
    { name: "punk", id: "punk" },
    { name: "pop", id: "pop" },
    { name: "rap", id: "rap" },
    { name: "jazz", id: "jazz" },
    { name: "classical", id: "classical" },
  ];

  return (
    <>
      <div className="search-bar">
        <p>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="magnifying-glass"
            onClick={() => {
              handleQuerySubmit();
            }}
          />
        </p>
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <h1 className="browse-title">Browse</h1>
      <div>
        <div className="buttons-container">
          {decadeTimes.map((time) => (
            <button
              className={`decade-button btn-${time}`}
              key={time * 10}
              onClick={() => showCategories(`${time}s`)}>
              {time}&apos;s
            </button>
          ))}
        </div>
      </div>
      {decadeTimes.map((time) => (
        <CategoryContainer
          activeDecade={activeDecade}
          categoriesList={categoriesList}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          decade={time}
          key={time * 2}
        />
      ))}
      <div className="search-button-container">
        <button className="search-button" onClick={() => handleSubmit()}>
          Search
        </button>
      </div>

      <h2 className="recommend-title">Recommended</h2>
      <div className="buttons-container">
        {recommendedSongs.map((song) => (
          <div
            key={song.name}
            style={{
              width: "200px",
              height: "100px",
              backgroundImage: `url(${getThumbnail(song.url)})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              margin: "5px",
              color: "white",
            }}
            onClick={() => {
              setSongInfo(song);
              setPageNumber(3);
              setReturnState("Home Page");
            }}>
            <p>{song.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default RetroBeats;
