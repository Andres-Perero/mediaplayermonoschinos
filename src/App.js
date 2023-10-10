// App.js
import React, { useState } from "react";
import data from "./data/dataSerie.json";
import dataCaps from "./data/dataCaps.json";
import "./App.css"; // Importar el archivo CSS

function App() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullDescriptionCap, setShowFullDescriptionCap] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const toggleDescriptionCap = (chapter) => {
    if (selectedChapter === chapter) {
      setShowFullDescriptionCap(false);
      setSelectedChapter(null);
    } else {
      setShowFullDescriptionCap(true);
      setSelectedChapter(chapter);

      const selectedCap = dataCaps.find(
        (cap) => cap.chapter === chapter.titulo
      );
      if (selectedCap && selectedCap.dropcapsData.length > 0) {
        const currentPlayer = selectedCap.dropcapsData.find(
          (dropcap) => dropcap.player === selectedPlayer
        );

        setSelectedPlayer(
          currentPlayer
            ? currentPlayer.player
            : selectedCap.dropcapsData[0].player
        );
      }
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="container">
      <div className="info-column">
        {/* eslint-disable-next-line */}
        <a href="#" onClick={() => setSelectedChapter(null)}>
          <h1>{data.title}</h1>
        </a>

        {!selectedChapter && (
          <>
            <img
              src={data.imagenSrc}
              alt={data.title}
              className="cover-image"
            />
            <p>
              <strong>Géneros:</strong> {data.generos.join(", ")}
            </p>
            <p>
              <strong>Estreno:</strong> {data.estreno}
            </p>
            <p>
              <strong>Descripción:</strong>
              {showFullDescription
                ? data.descripcionCompleta
                : data.descripcion}
              <button onClick={() => toggleDescription()}>
                {showFullDescription ? "Ver menos" : "Ver más"}
              </button>
            </p>
            <p>
              <strong>Estado:</strong> {data.status}
            </p>
            {!selectedChapter && (
              <p>
                <strong>Episodios:</strong> {data.resultados.length}
              </p>
            )}
          </>
        )}
        {selectedChapter &&
          dataCaps.map(
            (cap, index) =>
              cap.chapter === selectedChapter.titulo &&
              showFullDescriptionCap && (
                <div className="chapter-details" key={index}>
                  <h2
                    className={cap.chapter === selectedChapter ? "active" : ""}
                  >
                    {cap.chapter}
                  </h2>

                  <div className="player-container">
                    <h3>Server</h3>
                    <div className="player-links">
                      {cap.dropcapsData.map(
                        (dropcap, i) =>
                          !dropcap.player.includes("publicidad") && (
                            <div key={i}>
                              {/* eslint-disable-next-line */}
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePlayerClick(dropcap.player);
                                }}
                                className={
                                  dropcap.player === selectedPlayer
                                    ? "active"
                                    : ""
                                }
                                rel="noopener noreferrer"
                              >
                                {dropcap.text}
                              </a>
                            </div>
                          )
                      )}
                    </div>
                  </div>

                  {selectedPlayer && (
                    <div className="video-player">
                      {/* eslint-disable-next-line */}
                      <iframe
                        src={selectedPlayer}
                        frameBorder="0"
                        marginWidth="0"
                        marginHeight="0"
                        scrolling="no"
                        width="700"
                        height="400"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  {selectedPlayer && (
                    <style>
                      {`
      #4vgu0o2s {
        display: none !important;
      }
    `}
                    </style>
                  )}

                  <div className="player-container">
                    <h3>Descargas</h3>
                    <div className="player-links">
                      {cap.downbtnsData.map((downbtn, j) => (
                        <div key={j}>
                          <a
                            href={downbtn.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {downbtn.buttonText}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
          )}
      </div>

      <div className="list-column">
        <h2>Episodios</h2>
        <div className="episode-list">
          <ul>
            {data.resultados.map((resultado, index) => (
              <li key={index}>
                <button
                  className={selectedChapter === resultado ? "active" : ""}
                  onClick={() => toggleDescriptionCap(resultado)}
                >
                  {resultado.titulo}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
