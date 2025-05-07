import React from "react";

const Step3HomeWorld = ({ homeWorld = {}, setHomeWorld, onBack, onNext }) => {
  const handleChange = (field, value) => {
    setHomeWorld((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="step-container">
      <h2>Planeta Natal</h2>

      <label>
        ¿Cuál es el clima dominante en el planeta?
        <input
          className="text"
          value={homeWorld.climate || ""}
          onChange={(e) => handleChange("climate", e.target.value)}
        />
      </label>

      <label>
        ¿Dónde vive la gente?
        <input
          className="text"
          value={homeWorld.populationLocation || ""}
          onChange={(e) => handleChange("populationLocation", e.target.value)}
        />
      </label>

      <label>
        ¿Cuál es el índice de criminalidad?
        <input
          className="text"
          value={homeWorld.crimeRate || ""}
          onChange={(e) => handleChange("crimeRate", e.target.value)}
        />
      </label>

      <label>
        ¿Es feliz la gente?
        <input
          className="text"
          value={homeWorld.happiness || ""}
          onChange={(e) => handleChange("happiness", e.target.value)}
        />
      </label>

      <label>
        ¿Cuánto dinero gasta la Casa en sus súbditos?
        <input
          className="text"
          value={homeWorld.spending || ""}
          onChange={(e) => handleChange("spending", e.target.value)}
        />
      </label>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={onBack}>← Volver</button>
        <button
          onClick={onNext}
          disabled={
            !homeWorld.climate ||
            !homeWorld.populationLocation ||
            !homeWorld.crimeRate ||
            !homeWorld.happiness ||
            !homeWorld.spending
          }
          style={{ marginLeft: "1rem" }}
        >
          Siguiente → Estandarte y Armas
        </button>
      </div>
    </div>
  );
};

export default Step3HomeWorld;
