import React from "react";
import HeaderWithTextOverlay from "./Components/Header";
import backgroundImage from "../src/images/carousel/36779_starwars_franchise_header_mb.jpg";
import StarwarsInfo from "../src/Components/StarwarsInfo";
import "../src/styles/fonts.css";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <HeaderWithTextOverlay imageSrc={backgroundImage} />
      <StarwarsInfo />
    </div>
  );
};

export default App;
