function Search({ searchHandler, searchValue, singleCountry }) {
  return (
    <section className="App-search">
      <label htmlFor="search" className="item1">
        Find Countries
      </label>
      <input
        type="search"
        name="search"
        id="search"
        onChange={searchHandler}
        value={searchValue}
        className="item2"
      ></input>
      <small className="item3">
        {singleCountry.length === 0
          ? "type above until you see many results or just one result"
          : ""}
      </small>
    </section>
  );
}

export default Search;
