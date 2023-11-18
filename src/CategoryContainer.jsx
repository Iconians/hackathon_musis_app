function CategoryContainer({
  activeDecade,
  categoriesList,
  selectedCategories,
  handleCategoryChange,
  decade,
}) {
  return (
    <>
      <div
        className={`category-container ${
          activeDecade === `${decade}s` ? "active" : ""
        }`}>
        <h3 className="genres-title">{decade}&apos;s Categories</h3>
        <form>
          <div className="flexbox">
            {categoriesList.map((category) => (
              <div key={category.id} className="category-list">
                <input
                  type="checkbox"
                  id={category.id}
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                />
                <label htmlFor={category.id}>{category.name}</label>
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
}

export default CategoryContainer;
