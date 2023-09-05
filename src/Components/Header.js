import React from "react";
import "../App.css";

const HeaderWithTextOverlay = ({ imageSrc, overlayText }) => {
  return (
    <header className="header-with-text-overlay">
      <img src={imageSrc} alt="Header Background" className="header-image" />
      <div className="overlay-text">
        <h2>Bienvenidos!</h2>
        <p className="fitext">
          Aca pueden encontrar toda la informacion relacionada con starwars, te
          invito a manipular los desplegables abajo
        </p>
      </div>
    </header>
  );
};

export default HeaderWithTextOverlay;
