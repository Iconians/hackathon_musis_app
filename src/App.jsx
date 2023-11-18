import { useState, useEffect } from "react";
import "./App.css";
import RetroBeats from "./FrontPage";
import SearchByCategory from "./SearchByCategory";
import SearchByQuery from "./SearchByQuery";
import SongInfo from "./SongInfo";
import { getSongs } from "./getSongs";

function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const [decade, setDecade] = useState("");
  const [categories, setCategories] = useState([]);
  const [songInfo, setSongInfo] = useState({});
  const [songs, setSongs] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [returnState, setReturnState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryResults, setSearchQueryResults] = useState([]);

  useEffect(() => {
    getSongs().then((data) => setSongs(data));
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      sixRecommendedSongs();
    }
  }, [songs]);

  const getThumbnail = (str) => {
    let [firstPart, secondPart] = str.split("embed/");
    secondPart.toString().split("?");
    return `http://img.youtube.com/vi/${secondPart.split("?")[0]}/default.jpg`;
  };

  const sixRecommendedSongs = () => {
    let arrayOfSongs = [];
    for (let i = 0; i < 6; i++) {
      arrayOfSongs.push(songs[Math.floor(Math.random() * songs.length - 1)]);
    }
    setRecommendedSongs(arrayOfSongs);
  };

  function objectIncludesQuery(obj, query) {
    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        String(obj[key].toLowerCase()).includes(query.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  }

  const handleQuerySubmit = () => {
    let results = [];
    for (const obj of songs) {
      if (objectIncludesQuery(obj, searchQuery)) {
        results.push(obj);
      }
    }
    setSearchQueryResults(results);
    setPageNumber(2);
  };

  return (
    <>
      {
        pageNumber === 0 ? (
          <RetroBeats
            changePage={setPageNumber}
            setDecade={setDecade}
            setCategories={setCategories}
            setSongInfo={setSongInfo}
            setPageNumber={setPageNumber}
            getThumbnail={getThumbnail}
            recommendedSongs={recommendedSongs}
            setReturnState={setReturnState}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleQuerySubmit={handleQuerySubmit}
          />
        ) : pageNumber === 1 ? (
          <SearchByCategory
            decade={decade}
            categories={categories}
            setSongInfo={setSongInfo}
            setPageNumber={setPageNumber}
            getThumbnail={getThumbnail}
          />
        ) : pageNumber === 2 ? (
          <SearchByQuery
            searchQueryResults={searchQueryResults}
            setPageNumber={setPageNumber}
            getThumbnail={getThumbnail}
            setSongInfo={setSongInfo}
            searchQuery={searchQuery}
            setReturnState={setReturnState}
          />
        ) : pageNumber === 3 ? (
          <SongInfo
            songInfo={songInfo}
            returnState={returnState}
            setPageNumber={setPageNumber}
          />
        ) : (
          "false"
        )
        // <SongInfo songInfo={songInfo} returnState={returnState} setPageNumber={setPageNumber}/>
      }
    </>
  );
}

export default App;
