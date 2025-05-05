import React, { useEffect } from "react";

const Step3Skills = ({
  skills,
  setSkills,
  archetype,
  skillTranslations,
  onBack,
  onNext,
}) => {
  const totalPoints = 5;

  useEffect(() => {
    if (
      archetype.mainSkill &&
      archetype.secondarySkill &&
      (skills[archetype.mainSkill] !== 6 ||
        skills[archetype.secondarySkill] !== 5)
    ) {
      setSkills((prev) => ({
        ...Object.fromEntries(Object.keys(prev).map((skill) => [skill, 4])),
        [archetype.mainSkill]: 6,
        [archetype.secondarySkill]: 5,
      }));
    }
  }, [archetype.mainSkill, archetype.secondarySkill]);

  const spentPoints =
    Object.entries(skills).reduce((acc, [skill, value]) => {
      const base =
        skill === archetype.mainSkill
          ? 6
          : skill === archetype.secondarySkill
          ? 5
          : 4;
      return acc + Math.max(0, value - base);
    }, 0) || 0;

  const handleIncrease = (skill) => {
    if (spentPoints < totalPoints && skills[skill] < 8) {
      setSkills((prev) => ({
        ...prev,
        [skill]: prev[skill] + 1,
      }));
    }
  };

  const handleDecrease = (skill) => {
    const minValue =
      skill === archetype.mainSkill
        ? 6
        : skill === archetype.secondarySkill
        ? 5
        : 4;

    if (skills[skill] > minValue) {
      setSkills((prev) => ({
        ...prev,
        [skill]: prev[skill] - 1,
      }));
    }
  };

  const skillList = Object.entries(skills);

  if (!archetype.mainSkill || !archetype.secondarySkill) {
    return (
      <div className="step-container">
        <h2>Habilidades</h2>
        <p style={{ color: "red" }}>
          ⚠️ Debes seleccionar una habilidad principal y secundaria en el paso
          anterior.
        </p>
        <button onClick={onBack}>← Volver</button>
      </div>
    );
  }

  return (
    <div className="step-container">
      <h2>Habilidades</h2>
      <p>Distribuye 5 puntos entre tus habilidades (máximo 8 por habilidad).</p>
      <p>
        <strong>Puntos disponibles:</strong> {totalPoints - spentPoints}
      </p>

      <ul>
        {skillList.map(([skill, value]) => {
          const isMain = skill === archetype.mainSkill;
          const isSecondary = skill === archetype.secondarySkill;

          return (
            <li key={skill}>
              <span
                style={{
                  fontWeight: isMain || isSecondary ? "bold" : "normal",
                  color: isMain ? "green" : isSecondary ? "blue" : "black",
                }}
              >
                {skillTranslations[skill]}:
              </span>{" "}
              <button onClick={() => handleDecrease(skill)}>-</button>
              <span> {value} </span>
              <button onClick={() => handleIncrease(skill)}>+</button>
            </li>
          );
        })}
      </ul>

      <button onClick={onBack}>← Volver a Arquetipo</button>
      <button onClick={onNext} disabled={spentPoints < totalPoints}>
        Siguiente → Especialidades
      </button>
    </div>
  );
};

export default Step3Skills;
