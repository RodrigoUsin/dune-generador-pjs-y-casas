import React from "react";

const houseClassOptions = ["emergente", "menor", "mayor", "gran"];
const houseClassTranslations = {
  emergente: "Casa Emergente",
  menor: "Casa Menor",
  mayor: "Casa Mayor",
  gran: "Gran Casa",
};
const Step1HouseClass = ({ houseClass, setHouseClass, onNext }) => {
  const handleInputChange = (field, value) => {
    setHouseClass((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="step-container">
      <h2>Tipo de Casa</h2>
      <label>
        Nombre de la Casa:
        <input
          className="text"
          value={houseClass.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </label>
      <label>
        Tipo:
        <select
          value={houseClass.type || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
        >
          <option value="">Selecciona un tipo</option>
          {houseClassOptions.map((option) => (
            <option key={option} value={option}>
              {houseClassTranslations[option]}
            </option>
          ))}
        </select>
      </label>
      <button onClick={onNext} disabled={!houseClass.name || !houseClass.type}>
        Siguiente → Dominios iniciales
      </button>
    </div>
  );
};

export default Step1HouseClass;
