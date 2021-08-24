import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  // Function to get the details about the pokemon from the pokeapi API
  const onSubmit = async (e) => {
    e.preventDefault();

    const obj = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await obj.json();
    setResult(data);
  };

  return (
    <div className="main">
      {/* Background Image */}
      <img className="bg-img" src="/images/pokeball-bg.jpg" alt="bg-img" />

      {/* Heading plus icon at the top */}
      <header className="header">
        <img className="img-icon" src="favicon.ico" alt="img-icon" />
        <h2>PokemonDigi</h2>
      </header>

      <section className="body">
        {/* Form to search the name of the pokemon */}
        <form method="GET" className="form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="pikachu"
            onChange={(event) => setSearch(event.target.value)}
          />

          <input type="submit" value="Search" />
        </form>

        {/* Displaying the details of the pokemon which was retrieved */}
        {result.length !== 0 ? (
          <div className="pokemon-info">
            <div className="pokemon-info2">
              <div className="details">
                <h3>Name: </h3>
                <p>{result.name}</p>
              </div>

              <img src={result.sprites.front_default} alt="Front Default" />
            </div>

            <h3>Type(s): </h3>
            {result.length !== 0 ? (
              <>
                {result.types.map((ele, index) => {
                  return <p key={index}> {ele.type.name}</p>;
                })}
              </>
            ) : (
              ""
            )}

            <h3>Abilities: </h3>
            {result.length !== 0 ? (
              <>
                {result.abilities.map((ele, index) => {
                  return <p key={index}> {ele.ability.name}</p>;
                })}
              </>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </section>

      {/* Footer of the page */}
      <section className="footer">
        <p>Copyright © PokemonDigi 2021</p>
      </section>
    </div>
  );
}

export default App;
