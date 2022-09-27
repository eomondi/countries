function Data({ singleCountry }) {
  return (
    <section>
      <h1>
        {singleCountry.length !== 0 ? singleCountry.name.official : "Country"}
      </h1>
      <p>
        Capital(s):{" "}
        {singleCountry.length !== 0
          ? singleCountry.capital.map((capital) => (
              <span key={capital}>{capital} </span>
            ))
          : "Capital(s)"}
      </p>
      <p>
        Area in km<sup>2</sup>:{" "}
        {singleCountry.length !== 0 ? singleCountry.area : "Area"}
      </p>
      <p>
        <strong>Language(s): </strong>
      </p>
      <ul>
        {singleCountry.length !== 0
          ? Object.values(singleCountry.languages).map((language) => (
              <li key={language}>{language}</li>
            ))
          : "Language(s)"}
      </ul>
      <img
        src={
          singleCountry.length !== 0
            ? singleCountry.flags.png
            : "https://picsum.photos/275/125"
        }
        alt="flag"
      ></img>
    </section>
  );
}

export default Data;
