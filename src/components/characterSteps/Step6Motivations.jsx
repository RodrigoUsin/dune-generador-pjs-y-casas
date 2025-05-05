import React from "react";

const Step6Motivations = ({ motivations, setMotivations, onNext, onBack }) => {
  const GAME_MOTIVATIONS = ["Deber", "Fe", "Justicia", "Poder", "Verdad"];
  const [activeTab, setActiveTab] = React.useState(0);

  // Ordenar por puntuación descendente
  const sortedMotivations = [...motivations]
    .map((m, index) => ({ ...m, originalIndex: index }))
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  const handleMotivationChange = (index, value) => {
    const updated = [...motivations];
    updated[index].name = value;
    setMotivations(updated);
  };

  const handleScoreChange = (index, value) => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 4 || numValue > 8) return;

    // Verificar que no se repita la puntuación
    const isDuplicate = motivations.some(
      (m, i) => i !== index && m.score === numValue
    );
    if (isDuplicate) return;

    const updated = [...motivations];
    updated[index].score = numValue;
    setMotivations(updated);
  };

  const handleSloganChange = (index, value) => {
    const updated = [...motivations];
    updated[index].slogan = value;
    setMotivations(updated);
  };

  const swapScores = (index1, index2) => {
    const updated = [...motivations];
    const tempScore = updated[index1].score;
    updated[index1].score = updated[index2].score;
    updated[index2].score = tempScore;
    setMotivations(updated);
  };

  return (
    <div className="step-container">
      <h2>Motivaciones y Lemas</h2>

      {/* Resumen visual de puntuaciones */}

      {/* Panel de edición */}
      <div className="edit-panel">
        <div className="tabs">
          {motivations.map((motivation, index) => (
            <button
              key={index}
              className={`tab ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {motivation.name || `Motivación ${index + 1}`}
              {motivation.score && (
                <span className="tab-score">{motivation.score}</span>
              )}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <div className="motivation-input">
            <label>
              Selecciona motivación:
              <select
                value={motivations[activeTab].name || ""}
                onChange={(e) =>
                  handleMotivationChange(activeTab, e.target.value)
                }
              >
                <option value="">Elige una...</option>
                {GAME_MOTIVATIONS.map((motivation) => (
                  <option
                    key={motivation}
                    value={motivation}
                    disabled={motivations.some(
                      (m) =>
                        m.name === motivation &&
                        m.name !== motivations[activeTab].name
                    )}
                  >
                    {motivation}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Asignar puntuación:
              <select
                value={motivations[activeTab].score || ""}
                onChange={(e) => handleScoreChange(activeTab, e.target.value)}
              >
                <option value="">Selecciona puntuación</option>
                {[8, 7, 6, 5, 4].map((score) => (
                  <option
                    key={score}
                    value={score}
                    disabled={motivations.some(
                      (m) =>
                        m.score === score &&
                        m.name !== motivations[activeTab].name
                    )}
                  >
                    {score}{" "}
                    {motivations.find((m) => m.score === score)
                      ? `(Ocupado)`
                      : ""}
                  </option>
                ))}
              </select>
            </label>

            {sortedMotivations.findIndex((m) => m.originalIndex === activeTab) <
              3 && (
              <label>
                Lema (solo para las 3 principales):
                <textarea
                  value={motivations[activeTab].slogan || ""}
                  onChange={(e) =>
                    handleSloganChange(activeTab, e.target.value)
                  }
                  placeholder={`Ej. "${
                    motivations[activeTab].name || "Esta motivación"
                  } es lo que me guía"`}
                  rows={3}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Ranking visual */}
      <div className="ranking-section">
        <h3>Orden actual de importancia:</h3>
        <div className="ranking-list">
          {sortedMotivations
            .filter((m) => m.name)
            .map((motivation, index) => (
              <div key={index} className="ranking-item">
                <div className="rank-badge">#{index + 1}</div>
                <div className="motivation-info">
                  <strong>{motivation.name}</strong>
                  <span className="motivation-score">
                    Puntuación: {motivation.score}
                  </span>
                  {index < 3 && motivation.slogan && (
                    <div className="slogan-preview">"{motivation.slogan}"</div>
                  )}
                </div>
                {index > 0 && (
                  <button
                    className="swap-button"
                    onClick={() =>
                      swapScores(
                        motivation.originalIndex,
                        sortedMotivations[index - 1].originalIndex
                      )
                    }
                  >
                    ↑ Subir
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Navegación */}
      <div className="step-navigation">
        <button className="btn-prev" onClick={onBack}>
          ← Volver
        </button>
        <button
          className="btn-next"
          onClick={onNext}
          disabled={
            motivations.filter((m) => m.name && m.score).length < 5 ||
            new Set(motivations.map((m) => m.score)).size < 5
          }
        >
          Siguiente → Recursos
        </button>
      </div>
    </div>
  );
};

export default Step6Motivations;
