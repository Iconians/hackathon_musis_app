/* eslint-disable react/prop-types */
import "./songinfo.css";
import { useState } from "react";

export default function SongInfo({ songInfo, returnState, setPageNumber }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className={isDarkMode ? "background-image" : "background-color"}>
      <div className="top-nav">
        <a href="#">
          <span
            className="material-icons"
            onClick={() =>
              returnState === "Home Page"
                ? setPageNumber(0)
                : returnState === "Search Results"
                ? setPageNumber(1)
                : setPageNumber(2)
            }>
            {" "}
            arrow_back_ios{" "}
          </span>
        </a>
        <h2 className="nav-logo">
          byte-<span>beats</span>
        </h2>
      </div>
      {[songInfo].map((item) => {
        return (
          <>
            <div id="song-container">
              <div className="music-container">
                <h3 className="title-album">{item.name}</h3>
                <div className="album-cover">
                  <iframe
                    width="560"
                    height="315"
                    src={item.url}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
                </div>
              </div>
              <div className="info-container">
                <div className="img-title__combo">
                  <span className="fake-img">
                    <img
                      src="./images/orange ish note.png"
                      className="fake-img-note"
                      alt=""
                    />
                  </span>
                  <div id="song-info">
                    <p className="song-title">{item.author}</p>
                    <p className="song-category">{item.categories}</p>
                    <p className="song-decates">{item.decade}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <div className="footer">
        <a>
          <i
            className="material-icons"
            onClick={() => {
              setPageNumber(0);
            }}>
            home
          </i>
        </a>
        <button
          className={isDarkMode ? "background-image" : "background-color"}
          onClick={toggleTheme}>
          <i className="material-icons">settings</i>
        </button>
      </div>
    </div>
  );
}
