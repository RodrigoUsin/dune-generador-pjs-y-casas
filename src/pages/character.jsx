import * as React from "react";
import Layout from "../components/layout";

const CharacterPage = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const skillTranslations = {
    discipline: "Disciplina",
    battle: "Combate",
    communication: "Comunicación",
    understand: "Intelecto",
    move: "Movimiento",
  };

  const [concept, setConcept] = React.useState({ idea: "", factionTrait: "" });
  const [archetype, setArchetype] = React.useState({
    name: "",
    trait: "",
    mainSkill: "",
    secondarySkill: "",
    specialties: "",
    talent: "",
    motivation: "",
  });
  const [skills, setSkills] = React.useState({
    discipline: 4,
    battle: 4,
    communication: 4,
    understand: 4,
    move: 4,
  });

  const [specialties, setSpecialties] = React.useState([
    { skill: "", name: "" },
    { skill: "", name: "" },
    { skill: "", name: "" },
    { skill: "", name: "" },
  ]);
  const [talents, setTalents] = React.useState([]);
  const [motivations, setMotivations] = React.useState([]);
  const [slogans, setSlogans] = React.useState([]);
  const [resources, setResources] = React.useState([]);
  const [finalTouches, setFinalTouches] = React.useState({
    reputationTrait: "",
    ambition: "",
    name: "",
    personality: "",
    appearance: "",
    relationships: "",
  });

  const steps = [
    "1. Concepto",
    "2. Arquetipo",
    "3. Habilidades",
    "4. Especialidades",
    "5. Talentos",
    "6. Motivaciones y Lemas",
    "7. Recursos",
    "8. Toques finales",
  ];

  // Efecto para actualizar habilidades cuando se seleccionan principales/secundarias
  React.useEffect(() => {
    if (archetype.mainSkill && archetype.secondarySkill) {
      setSkills((prev) => ({
        ...Object.fromEntries(Object.keys(prev).map((skill) => [skill, 4])),
        [archetype.mainSkill]: 6,
        [archetype.secondarySkill]: 5,
      }));
    }
  }, [archetype.mainSkill, archetype.secondarySkill]);

  // Paso 1: Concepto
  const renderConceptStep = () => (
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
      <button onClick={() => setCurrentStep(2)}>Siguiente → Arquetipo</button>
    </div>
  );

  // Paso 2: Arquetipo con desplegables en español
  const renderArchetypeStep = () => {
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
              setArchetype((prev) => ({ ...prev, specialties: e.target.value }))
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

        <button onClick={() => setCurrentStep(1)}>← Volver a Concepto</button>
        <button
          onClick={() => setCurrentStep(3)}
          disabled={
            !archetype.mainSkill || !archetype.secondarySkill || isSameSkill
          }
        >
          Siguiente → Habilidades
        </button>
      </div>
    );
  };

  // Paso 3: Habilidades
  const renderSkillsStep = () => {
    const totalPoints = 5;
    const usedPoints = Object.entries(skills).reduce((sum, [skill, value]) => {
      const baseValue =
        skill === archetype.mainSkill
          ? 6
          : skill === archetype.secondarySkill
          ? 5
          : 4;
      return sum + (value - baseValue);
    }, 0);

    const remainingPoints = totalPoints - usedPoints;
    const canIncrease = (skill) => {
      if (remainingPoints <= 0) return false;
      if (skill === archetype.mainSkill) return skills[skill] < 8;
      if (skill === archetype.secondarySkill) return skills[skill] < 8;
      return skills[skill] < 8;
    };

    const canDecrease = (skill) => {
      if (skill === archetype.mainSkill) return skills[skill] > 6;
      if (skill === archetype.secondarySkill) return skills[skill] > 5;
      return skills[skill] > 4;
    };

    const handleIncrease = (skill) => {
      if (canIncrease(skill)) {
        setSkills((prev) => ({ ...prev, [skill]: prev[skill] + 1 }));
      }
    };

    const handleDecrease = (skill) => {
      if (canDecrease(skill)) {
        setSkills((prev) => ({ ...prev, [skill]: prev[skill] - 1 }));
      }
    };

    return (
      <div className="step-container">
        <h2>Habilidades</h2>
        <p>
          Tienes <strong>{remainingPoints}</strong> puntos restantes de{" "}
          {totalPoints} para distribuir.
        </p>

        {Object.entries(skills).map(([skill, value]) => (
          <div
            key={skill}
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ minWidth: "120px", display: "inline-block" }}>
              {skillTranslations[skill]}:
            </span>
            <button
              onClick={() => handleDecrease(skill)}
              disabled={!canDecrease(skill)}
            >
              -
            </button>
            <span
              style={{
                margin: "0 10px",
                minWidth: "20px",
                textAlign: "center",
              }}
            >
              {value}
            </span>
            <button
              onClick={() => handleIncrease(skill)}
              disabled={!canIncrease(skill)}
            >
              +
            </button>
            {skill === archetype.mainSkill && <span> (Principal)</span>}
            {skill === archetype.secondarySkill && <span> (Secundaria)</span>}
          </div>
        ))}

        <button onClick={() => setCurrentStep(2)}>← Volver</button>
        <button
          onClick={() => setCurrentStep(4)}
          disabled={remainingPoints > 0}
          style={{ marginLeft: "1rem" }}
        >
          Siguiente → Especialidades
        </button>
        {remainingPoints > 0 && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>
            ⚠️ Aún tienes {remainingPoints} puntos por distribuir.
          </p>
        )}
      </div>
    );
  };

  // Paso 4: Especialidades
  const renderSpecialtiesStep = () => {
    const mainSkill = archetype.mainSkill || "";

    return (
      <div className="step-container">
        <h2>Especialidades</h2>
        <p>
          Elige 4 especialidades (la primera será para tu habilidad principal).
        </p>

        {/* Especialidad principal fija */}
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <strong>Especialidad en {skillTranslations[mainSkill]}:</strong>
            <input
              type="text"
              value={specialties[0].name}
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
                value={specialties[index].skill}
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
                value={specialties[index].name}
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

        <button onClick={() => setCurrentStep(3)}>
          ← Volver a Habilidades
        </button>
        <button
          onClick={() => setCurrentStep(5)}
          style={{ marginLeft: "1rem" }}
        >
          Siguiente → Talentos
        </button>
      </div>
    );
  };

  // Función simple para sugerencias
  const getSpecialtySuggestion = (skill) => {
    const suggestions = {
      discipline: "Meditación Weirding",
      battle: "Cuchillo Crysknife",
      communication: "Lengua Chakobsa",
      move: "Navegación del desierto",
      understand: "Memoria Pránica",
    };
    return suggestions[skill] || "Especialidad";
  };

  // Pasos 5 al 8 como placeholders
  const renderPlaceholderStep = (title, stepBack, stepNext) => (
    <div className="step-container">
      <h2>{title}</h2>
      <p>(Contenido próximamente)</p>
      {stepBack && (
        <button onClick={() => setCurrentStep(stepBack)}>← Volver</button>
      )}
      {stepNext && (
        <button onClick={() => setCurrentStep(stepNext)}>Siguiente →</button>
      )}
    </div>
  );

  return (
    <Layout title="Creación de Personaje">
      <div className="character-creation">
        {/* Navegación por pasos */}
        <div className="steps" role="tablist">
          {steps.map((label, index) => (
            <button
              key={index}
              role="tab"
              className={currentStep === index + 1 ? "active" : ""}
              onClick={() => setCurrentStep(index + 1)}
              aria-selected={currentStep === index + 1}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Renderizar el paso actual */}
        {
          {
            1: renderConceptStep(),
            2: renderArchetypeStep(),
            3: renderSkillsStep(),
            4: renderSpecialtiesStep(),
            5: renderPlaceholderStep("Talentos", 4, 6),
            6: renderPlaceholderStep("Motivaciones y Lemas", 5, 7),
            7: renderPlaceholderStep("Recursos", 6, 8),
            8: (
              <div className="step-container">
                <h2>Toques finales</h2>
                <p>(Toques finales próximamente)</p>
                <button onClick={() => setCurrentStep(7)}>← Volver</button>
                <button onClick={() => alert("¡Personaje creado!")}>
                  Finalizar
                </button>
              </div>
            ),
          }[currentStep]
        }
      </div>
    </Layout>
  );
};

export default CharacterPage;
