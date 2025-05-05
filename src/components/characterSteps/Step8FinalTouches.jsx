import React from "react";

const Step8FinalTouches = ({
  finalTouches,
  setFinalTouches,
  onComplete,
  onBack,
}) => {
  const handleChange = (field, value) => {
    setFinalTouches({
      ...finalTouches,
      [field]: value,
    });
  };

  return (
    <div className="step-container">
      <h2>Toques Finales</h2>

      <div className="input-group">
        <label>
          Rasgo de reputación/personalidad:
          <input
            type="text"
            value={finalTouches.reputationTrait || ""}
            onChange={(e) => handleChange("reputationTrait", e.target.value)}
            placeholder="Ej: 'Líder carismático' o 'Táctico despiadado'"
          />
        </label>
      </div>

      <div className="input-group">
        <label>
          Ambición principal:
          <textarea
            value={finalTouches.ambition || ""}
            onChange={(e) => handleChange("ambition", e.target.value)}
            placeholder="Ej: 'Convertirme en Duque de Arrakis'"
            rows={2}
          />
        </label>
      </div>

      <div className="input-group">
        <label>
          Nombre completo:
          <input
            type="text"
            value={finalTouches.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Ej: Leto Atreides"
          />
        </label>
      </div>

      <div className="input-group">
        <label>
          Personalidad:
          <textarea
            value={finalTouches.personality || ""}
            onChange={(e) => handleChange("personality", e.target.value)}
            placeholder="Describe cómo se comporta tu personaje en distintas situaciones"
            rows={3}
          />
        </label>
      </div>

      <div className="input-group">
        <label>
          Apariencia física:
          <textarea
            value={finalTouches.appearance || ""}
            onChange={(e) => handleChange("appearance", e.target.value)}
            placeholder="Rasgos distintivos, vestimenta, marcas..."
            rows={2}
          />
        </label>
      </div>

      <div className="input-group">
        <label>
          Relaciones importantes:
          <textarea
            value={finalTouches.relationships || ""}
            onChange={(e) => handleChange("relationships", e.target.value)}
            placeholder="Familia, aliados, enemigos, rivalidades..."
            rows={3}
          />
        </label>
      </div>

      <div className="step-navigation">
        <button className="btn-prev" onClick={onBack}>
          ← Volver
        </button>
        <button
          className="btn-next"
          onClick={onComplete}
          disabled={
            !finalTouches.reputationTrait ||
            !finalTouches.ambition ||
            !finalTouches.name
          }
        >
          Finalizar Personaje
        </button>
      </div>
    </div>
  );
};

export default Step8FinalTouches;
