import { useEffect, useState } from "react";
import { getSongs } from "./getSongs";
import "./SearchByCategory.css";

function SearchByCategory({
  decade,
  categories,
  setSongInfo,
  setPageNumber,
  getThumbnail,
}) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongs().then((data) => setSongs(data));
  }, []);

  const getRidOfS = (str) => {
    let newArray = Array.from(str);
    newArray.pop();
    return newArray.join("");
  };
  const formatCategoriesTitle = () => {
    if (categories.length >= 3) {
      let newArray = [];
      for (let i = 0; i < categories.length - 1; i++) {
        newArray.push(categories[i]);
      }
      let finalArray = [newArray.join(", "), categories[categories.length - 1]];
      return finalArray.join(", and ");
    } else if (categories.length === 2) {
      return categories.join(" and ");
    } else return categories[0];
  };

  let filteredArray = [];
  const filterCategories = () => {
    if (songs.length !== undefined) {
      for (let i = 0; i < songs.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          if (
            songs[i].categories.includes(categories[j]) &&
            songs[i].decade === decade
          ) {
            filteredArray.push(songs[i]);
          }
        }
      }
      return filteredArray;
    } else alert("Error Occurred");
  };
  filterCategories();

  return (
    <>
      <div className="flexbox">
        <button
          className="back-to-home-button"
          onClick={() => setPageNumber(0)}>
          Back to Home
        </button>
      </div>

      <br />
      <b className="search-title">{`${getRidOfS(
        decade
      )}'s: ${formatCategoriesTitle()}`}</b>
      <div className="flexbox">
        {filteredArray.map((item) => (
          <div
            key={item.name}
            style={{
              width: "200px",
              height: "100px",
              backgroundImage: `url(${getThumbnail(item.url)})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              margin: "5px",
              color: "white",
            }}
            onClick={() => {
              setSongInfo(item);
              setPageNumber(3);
            }}>
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchByCategory;
