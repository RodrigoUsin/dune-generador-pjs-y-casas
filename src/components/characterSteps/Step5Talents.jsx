import React from "react";

const Step5Talents = ({ talents, setTalents, onNext, onBack }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTalents({
      ...talents,
      [name]: value,
    });
  };

  return (
    <div className="step-container">
      <h2>Talentos</h2>
      <p>Describe los 3 talentos iniciales de tu personaje:</p>

      <div style={{ marginBottom: "1.5rem" }}>
        <label>
          Talento 1:
          <input
            type="text"
            name="talent1"
            value={talents.talent1 || ""}
            onChange={handleChange}
            placeholder="Talento de facción, si procede"
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="desc1"
            value={talents.desc1 || ""}
            onChange={handleChange}
            placeholder="Descripción del talento"
            rows={2}
          />
        </label>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label>
          Talento 2:
          <input
            type="text"
            name="talent2"
            value={talents.talent2 || ""}
            onChange={handleChange}
            placeholder=""
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="desc2"
            value={talents.desc2 || ""}
            onChange={handleChange}
            placeholder="Descripción del talento"
            rows={2}
          />
        </label>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label>
          Talento 3:
          <input
            type="text"
            name="talent3"
            value={talents.talent3 || ""}
            onChange={handleChange}
            placeholder=""
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="desc3"
            value={talents.desc3 || ""}
            onChange={handleChange}
            placeholder="Descripción del talento"
            rows={2}
          />
        </label>
      </div>

      <div className="step-navigation">
        <button className="btn-prev" onClick={onBack}>
          ← Volver
        </button>
        <button
          className="btn-next"
          onClick={onNext}
          disabled={!talents?.talent1}
        >
          Siguiente → Motivaciones
        </button>
      </div>
    </div>
  );
};

export default Step5Talents;
