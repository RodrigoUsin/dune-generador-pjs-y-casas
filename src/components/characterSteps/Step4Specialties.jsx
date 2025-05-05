import React from "react";

const Step4Specialties = ({
  specialties,
  setSpecialties,
  archetype,
  skillTranslations,
  getSpecialtySuggestion,
  onNext,
  onBack,
}) => {
  const mainSkill = archetype.mainSkill || "";

  return (
    <div className="step-container">
      <h2>Especialidades</h2>
      <p>
        Elige 4 especialidades (la primera será para tu habilidad principal).
      </p>

      {/* Especialidad principal */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          <strong>Especialidad en {skillTranslations[mainSkill]}:</strong>
          <input
            type="text"
            value={specialties[0]?.name || ""}
            onChange={(e) => {
              const newSpecialties = [...specialties];
              newSpecialties[0] = {
                skill: mainSkill,
                name: e.target.value,
              };
              setSpecialties(newSpecialties);
            }}
            placeholder={`Ej: ${getSpecialtySuggestion(mainSkill)}`}
          />
        </label>
      </div>

      {/* Otras 3 especialidades */}
      {[1, 2, 3].map((index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <label>
            Especialidad {index + 1}:
            <select
              value={specialties[index]?.skill || ""}
              onChange={(e) => {
                const newSpecialties = [...specialties];
                newSpecialties[index] = {
                  ...newSpecialties[index],
                  skill: e.target.value,
                };
                setSpecialties(newSpecialties);
              }}
            >
              <option value="">Selecciona habilidad</option>
              {Object.entries(skillTranslations).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={specialties[index]?.name || ""}
              onChange={(e) => {
                const newSpecialties = [...specialties];
                newSpecialties[index] = {
                  ...newSpecialties[index],
                  name: e.target.value,
                };
                setSpecialties(newSpecialties);
              }}
              placeholder="Nombre de la especialidad"
            />
          </label>
        </div>
      ))}

      <button onClick={onBack}>← Volver a Habilidades</button>
      <button onClick={onNext} style={{ marginLeft: "1rem" }}>
        Siguiente → Talentos
      </button>
    </div>
  );
};

export default Step4Specialties;
