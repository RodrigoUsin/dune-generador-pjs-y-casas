import React from "react";

const Step2Archetype = ({
  archetype,
  setArchetype,
  skillTranslations,
  onBack,
  onNext,
}) => {
  const skillOptions = Object.keys(skillTranslations);
  const isSameSkill =
    archetype.mainSkill && archetype.mainSkill === archetype.secondarySkill;

  return (
    <div className="step-container">
      <h2>Arquetipo</h2>

      <label>
        Nombre del arquetipo:
        <input
          type="text"
          value={archetype.name}
          onChange={(e) =>
            setArchetype((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </label>

      <label>
        Rasgo distintivo:
        <input
          type="text"
          value={archetype.trait}
          onChange={(e) =>
            setArchetype((prev) => ({ ...prev, trait: e.target.value }))
          }
        />
      </label>

      <label>
        Habilidad principal:
        <select
          value={archetype.mainSkill}
          onChange={(e) =>
            setArchetype((prev) => ({ ...prev, mainSkill: e.target.value }))
          }
        >
          <option value="">Selecciona una habilidad</option>
          {skillOptions.map((skill) => (
            <option key={`main-${skill}`} value={skill}>
              {skillTranslations[skill]}
            </option>
          ))}
        </select>
      </label>

      <label>
        Habilidad secundaria:
        <select
          value={archetype.secondarySkill}
          onChange={(e) =>
            setArchetype((prev) => ({
              ...prev,
              secondarySkill: e.target.value,
            }))
          }
        >
          <option value="">Selecciona una habilidad</option>
          {skillOptions.map((skill) => (
            <option
              key={`secondary-${skill}`}
              value={skill}
              disabled={skill === archetype.mainSkill}
            >
              {skillTranslations[skill]}
            </option>
          ))}
        </select>
      </label>

      {isSameSkill && (
        <p style={{ color: "red" }}>
          ⚠️ La habilidad secundaria no puede ser igual a la principal
        </p>
      )}

      <label>
        Especialidades (sugerencias):
        <input
          type="text"
          value={archetype.specialties}
          onChange={(e) =>
            setArchetype((prev) => ({
              ...prev,
              specialties: e.target.value,
            }))
          }
        />
      </label>

      <label>
        Talento:
        <input
          type="text"
          value={archetype.talent}
          onChange={(e) =>
            setArchetype((prev) => ({ ...prev, talent: e.target.value }))
          }
        />
      </label>

      <label>
        Motivación:
        <input
          type="text"
          value={archetype.motivation}
          onChange={(e) =>
            setArchetype((prev) => ({ ...prev, motivation: e.target.value }))
          }
        />
      </label>

      <button onClick={onBack}>← Volver a Concepto</button>
      <button
        onClick={onNext}
        disabled={
          !archetype.mainSkill || !archetype.secondarySkill || isSameSkill
        }
      >
        Siguiente → Habilidades
      </button>
    </div>
  );
};

export default Step2Archetype;
