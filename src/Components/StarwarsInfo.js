import React, { useState, useEffect } from "react";
import "../App.css";

const options = [
  { value: "people", label: "People" },
  { value: "planets", label: "Planets" },
  { value: "films", label: "Films" },
  { value: "vehicles", label: "Vehicles" },
  { value: "starships", label: "Starships" },
];

const imageMappings = {
  //people
  "Luke Skywalker": require("../images/people/LukeSkywalker.jpg"),
  "C-3PO": require("../images/people/C-3PO.jpg"),
  "R2-D2": require("../images/people/R2-D2.webp"),
  "Darth Vader": require("../images/people/Darth Vader.jpg"),
  "Leia Organa": require("../images/people/Leia Organa.jpg"),
  "Owen Lars": require("../images/people/Owen Lars.webp"),
  "Beru Whitesun lars": require("../images/people/Beru Whitesun lars.jpg"),
  "R5-D4": require("../images/people/R5-D4.webp"),
  "Biggs Darklighter": require("../images/people/Biggs Darklighter.webp"),
  "Obi-Wan Kenobi": require("../images/people/Obi-Wan Kenobi.png"),

  //planets

  Tatooine: require("../images/planets/Tatooine.webp"),
  Alderaan: require("../images/planets/Alderaan.jpeg"),
  "Yavin IV": require("../images/planets/Yavin IV.jpg"),
  Hoth: require("../images/planets/Hoth.jpg"),
  Dagobah: require("../images/planets/Dagobah.webp"),
  Bespin: require("../images/planets/Bespin.webp"),
  Endor: require("../images/planets/Endor.jpg"),
  Naboo: require("../images/planets/Naboo.jpg"),
  Coruscant: require("../images/planets/Coruscant.jpg"),
  Kamino: require("../images/planets/Kamino.jpg"),

  //films
  "A New Hope": require("../images/films/A New Hope.jpg"),
  "The Empire Strikes Back": require("../images/films/The Empire Strikes Back.jpg"),
  "Return of the Jedi": require("../images/films/Return of the Jedi.jpg"),
  "The Phantom Menace": require("../images/films/The Phantom Menace.jpg"),
  "Attack of the Clones": require("../images/films/Attack of the Clones.webp"),
  "Revenge of the Sith": require("../images/films/Revenge of the Sith.webp"),

  //vehicles

  "Sand Crawler": require("../images/vehicles/Sandcrawler-TMCh9.webp"),
  "T-16 skyhopper": require("../images/vehicles/T-16_Skyhopper_TCG-TT.webp"),
  "X-34 landspeeder": require("../images/vehicles/X-34 landspeeder.jpeg"),
  "TIE/LN starfighter": require("../images/vehicles/TIELN starfighter.jpeg"),
  Snowspeeder: require("../images/vehicles/Snowspeeder.webp"),
  "TIE bomber": require("../images/vehicles/TIE bomber.webp"),
  "AT-AT": require("../images/vehicles/AT-AT.webp"),
  "AT-ST": require("../images/vehicles/AT-ST.jpg"),
  "Storm IV Twin-Pod cloud car": require("../images/vehicles/Storm IV Twin-Pod cloud car.jpg"),
  "Sail barge": require("../images/vehicles/Sail barge.webp"),

  //starships

  "CR90 corvette": require("../images/starships/CR90 corvette.jpg"),
  "Star Destroyer": require("../images/starships/Star Destroyer.jpg"),
  "Sentinel-class landing craft": require("../images/starships/Sentinel-class landing craft.jpg"),
  "Death Star": require("../images/starships/Sentinel-class landing craft.jpg"),
  "Millennium Falcon": require("../images/starships/5b02ec561ae6622e008b4893.webp"),
  "Y-wing": require("../images/starships/Y-wing.jpg"),
  "X-wing": require("../images/starships/X-wing.jpg"),
  "TIE Advanced x1": require("../images/starships/TIE Advanced x1.jpg"),
  Executor: require("../images/starships/Executor.jpg"),
  "Rebel transport": require("../images/starships/Rebel transport.jpg"),
};

function StarwarsInfo() {
  const [lista, setLista] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [selectedName, setSelectedName] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);

  const isNameAttribute = selectedOption === "films";

  //Trear los datos del API
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://swapi.dev/api/${selectedOption}`);
      const data = await res.json();
      setLista(data.results);
    };

    fetchData();
  }, [selectedOption]);

  //buscar el valor unico para el renderizado

  useEffect(() => {
    const foundElement = lista.find((elemento) =>
      isNameAttribute
        ? elemento.title === selectedName
        : elemento.name === selectedName
    );
    setSelectedElement(foundElement);
  }, [selectedName, lista, isNameAttribute]);

  //setear la info en los desplegable

  return (
    <div>
      <div className="SelOp">
        <label htmlFor="apiOptions"></label>
        <select
          id="apiOptions"
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            setSelectedName("");
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="SelOp">
        <label htmlFor="nameOptions"></label>
        <select
          id="nameOptions"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value="">Selecciona un nombre</option>
          {lista.map((elemento, index) => (
            <option
              key={index}
              value={isNameAttribute ? elemento.title : elemento.name}
            >
              {isNameAttribute ? elemento.title : elemento.name}
            </option>
          ))}
        </select>
      </div>

      {selectedElement && (
        <div className="infcontainer">
          <img
            src={imageMappings[selectedName]}
            alt={selectedName}
            style={{ maxWidth: "300px" }}
          />
          {selectedOption === "people" && (
            <div className="elemPeople">
              <h3>{selectedElement.name}</h3>
              <ul>
                <li>
                  <b>Heigh:</b> {selectedElement.height} metros
                </li>
                <li>
                  <b>Wight: </b>
                  {selectedElement.mass} Kilogramos
                </li>
                <li>
                  <b>Hair Color: </b>
                  {selectedElement.hair_color}
                </li>
                <li>
                  <b>Skin Color: </b>
                  {selectedElement.skin_color}
                </li>
                <li>
                  <b>Eyes Color: </b>
                  {selectedElement.eye_color}
                </li>
                <li>
                  <b>Birth Year: </b>
                  {selectedElement.birth_year}
                </li>
                <li>
                  <b>Gender: </b>
                  {selectedElement.gender}
                </li>
              </ul>
            </div>
          )}
          {selectedOption === "planets" && (
            <div className="elemPlanets">
              <h3>{selectedElement.name}</h3>
              <ul>
                <li>
                  <b>Rotation Period:</b> {selectedElement.rotation_period}{" "}
                  metros
                </li>
                <li>
                  <b>Orbital Period: </b>
                  {selectedElement.orbital_period}
                </li>
                <li>
                  <b>Diameter: </b>
                  {selectedElement.diameter}
                </li>
                <li>
                  <b>Gravity: </b>
                  {selectedElement.gravity}
                </li>
                <li>
                  <b>Terrain: </b>
                  {selectedElement.terrain}
                </li>
                <li>
                  <b>Surface Water: </b>
                  {selectedElement.surface_water}
                </li>
                <li>
                  <b>Population: </b>
                  {selectedElement.population}
                </li>
              </ul>
            </div>
          )}
          {selectedOption === "films" && (
            <div className="elemFilms">
              <h3>{selectedElement.title}</h3>
              <ul>
                <li>
                  <b>Episode Id:</b> {selectedElement.episode_id}
                </li>
                <li>
                  <b>Opening Crawl: </b>
                  {selectedElement.opening_crawl}
                </li>
                <li>
                  <b>Director: </b>
                  {selectedElement.director}
                </li>
                <li>
                  <b>Producer: </b>
                  {selectedElement.producer}
                </li>
                <li>
                  <b>Release Date: </b>
                  {selectedElement.release_date}
                </li>
              </ul>
            </div>
          )}
          {selectedOption === "vehicles" && (
            <div className="elemVehicles">
              <h3>{selectedElement.name}</h3>
              <ul>
                <li>
                  <b>Model:</b> {selectedElement.model}
                </li>
                <li>
                  <b>Manufacturer: </b>
                  {selectedElement.manufacturer}
                </li>
                <li>
                  <b>Cost in Credits: </b>
                  {selectedElement.cost_in_credits}
                </li>
                <li>
                  <b>Length: </b>
                  {selectedElement.length}
                </li>
                <li>
                  <b>Max Atmosphering Speed: </b>
                  {selectedElement.max_atmosphering_speed}
                </li>
                <li>
                  <b>Crew: </b>
                  {selectedElement.crew}
                </li>
                <li>
                  <b>Passengers: </b>
                  {selectedElement.passengers}
                </li>
                <li>
                  <b>Cargo Capacity: </b>
                  {selectedElement.cargo_capacity}
                </li>
                <li>
                  <b>Consumables: </b>
                  {selectedElement.consumables}
                </li>
                <li>
                  <b>Vehicle Class: </b>
                  {selectedElement.vehicle_class}
                </li>
              </ul>
            </div>
          )}
          {selectedOption === "starships" && (
            <div className="elemStarships">
              <h3>{selectedElement.name}</h3>
              <ul>
                <li>
                  <b>Model:</b> {selectedElement.model}
                </li>
                <li>
                  <b>Manufacturer: </b>
                  {selectedElement.manufacturer}
                </li>
                <li>
                  <b>Cost in Credits: </b>
                  {selectedElement.cost_in_credits}
                </li>
                <li>
                  <b>Length: </b>
                  {selectedElement.length}
                </li>
                <li>
                  <b>Max Atmosphering Speed: </b>
                  {selectedElement.max_atmosphering_speed}
                </li>
                <li>
                  <b>Crew: </b>
                  {selectedElement.crew}
                </li>
                <li>
                  <b>Passengers: </b>
                  {selectedElement.passengers}
                </li>
                <li>
                  <b>Cargo Capacity: </b>
                  {selectedElement.cargo_capacity}
                </li>
                <li>
                  <b>Consumables: </b>
                  {selectedElement.consumables}
                </li>
                <li>
                  <b>Hyperdrive Rating: </b>
                  {selectedElement.hyperdrive_rating}
                </li>
                <li>
                  <b>MGLT: </b>
                  {selectedElement.MGLT}
                </li>
                <li>
                  <b>Starship Class: </b>
                  {selectedElement.starship_class}
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StarwarsInfo;
