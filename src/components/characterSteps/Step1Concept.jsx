import React from "react";

const Step1Concept = ({ concept, setConcept, onNext }) => {
  return (
    <div className="step-container">
      <h2>Concepto</h2>
      <label>
        ¿Qué tipo de personaje te gustaría jugar?
        <input
          type="text"
          value={concept.idea}
          onChange={(e) =>
            setConcept((prev) => ({ ...prev, idea: e.target.value }))
          }
        />
      </label>
      <label>
        Rasgo de facción (opcional):
        <input
          type="text"
          value={concept.factionTrait}
          onChange={(e) =>
            setConcept((prev) => ({
              ...prev,
              factionTrait: e.target.value,
            }))
          }
        />
      </label>
      <button onClick={onNext}>Siguiente → Arquetipo</button>
    </div>
  );
};

export default Step1Concept;
