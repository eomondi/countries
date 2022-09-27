import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Weather from "./components/Weather";
import Data from "./components/Data";

function App() {
  const [commonNames, setCommonNames] = useState([]);
  const [search, setSearch] = useState("");
  const [foundCountry, setFoundCountry] = useState([]);
  const [singleCountry, setSingleCountry] = useState([]);
  const [viewClicked, setViewClicked] = useState(false);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => {
        setCommonNames(
          response.data.map((country) => country.name.common.toLowerCase())
        );
      });
  }, []);

  const handleSearch = (event) => {
    setViewClicked(false);
    setSearch(event.target.value.toLowerCase());
    setFoundCountry(
      commonNames.filter((commonName) => commonName.includes(search))
    );

    if (foundCountry.length === 1) {
      axios
        .get(
          `https://restcountries.com/v3.1/name/${foundCountry}?fields=name,capital,languages,area,flags`
        )
        .then((response) => {
          setSingleCountry(response.data[0]);
        });
    }
  };

  const handleClick = (event) => {
    setViewClicked(true);
    axios
      .get(
        `https://restcountries.com/v3.1/name/${event.target.value}?fields=name,capital,languages,area,flags`
      )
      .then((response) => {
        setSingleCountry(response.data[0]);
      });
  };

  return viewClicked ? (
    <div className="App">
      <Header />
      <main className="App-main">
        <Search
          searchHandler={handleSearch}
          searchValue={search}
          singleCountry={singleCountry}
        />
        <Data singleCountry={singleCountry} />
        {singleCountry.length !== 0
          ? singleCountry.capital.map((capital) => (
              <Weather key={capital} capital={capital} />
            ))
          : "Weather Report in Capital(s)"}
      </main>
      <Footer />
    </div>
  ) : (
    <div className="App">
      <Header />
      <main className="App-main">
        <Search
          searchHandler={handleSearch}
          searchValue={search}
          singleCountry={singleCountry}
        />
        {foundCountry.length > 1 && foundCountry.length <= 10 ? (
          foundCountry.map((country) => {
            return (
              <div key={country}>
                <div className="container">
                  <p className="item">{country}</p>
                  <button
                    className="item"
                    onClick={handleClick}
                    value={country}
                  >
                    show
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <Data singleCountry={singleCountry} />
            {singleCountry.length !== 0
              ? singleCountry.capital.map((capital) => (
                  <Weather key={capital} capital={capital} />
                ))
              : "Weather Report in Capital(s)"}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
