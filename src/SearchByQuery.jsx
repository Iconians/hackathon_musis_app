import "./SearchByQuery.css";

function SearchByQuery({
  searchQueryResults,
  setPageNumber,
  getThumbnail,
  setSongInfo,
  searchQuery,
  setReturnState,
}) {
  return (
    <>
      <div className="flexbox">
        <button onClick={() => setPageNumber(0)}>Back to Home</button>
      </div>

      <p>{`Search Results for: "${searchQuery}"`}</p>
      <div className="flexbox">
        {searchQueryResults.map((item) => (
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
              setReturnState("Search Query Results");
            }}>
            {item.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchByQuery;
