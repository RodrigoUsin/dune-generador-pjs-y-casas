import React from "react";

const Step7Resources = ({ resources, setResources, onNext, onBack }) => {
  // Inicializar recursos si no existen
  React.useEffect(() => {
    if (resources.length === 0) {
      setResources([
        { name: "", description: "", isTangible: true },
        { name: "", description: "", isTangible: false },
        { name: "", description: "", isTangible: false },
      ]);
    }
  }, [resources, setResources]);

  const handleResourceChange = (index, field, value) => {
    const updated = [...resources];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setResources(updated);
  };

  const handleTangibleChange = (index) => {
    // Si estamos marcando este como tangible, asegurarnos que al menos uno queda tangible
    const currentTangibleCount = resources.filter((r) => r.isTangible).length;
    const isCurrentlyTangible = resources[index].isTangible;

    if (currentTangibleCount <= 1 && isCurrentlyTangible) {
      return; // No permitir quitar el último tangible
    }

    const updated = [...resources];
    updated[index].isTangible = !updated[index].isTangible;
    setResources(updated);
  };

  const isFormValid = () => {
    return (
      resources.filter((r) => r.name.trim()).length >= 3 &&
      resources.filter((r) => r.isTangible).length >= 1
    );
  };

  return (
    <div className="step-container">
      <h2>Recursos del Personaje</h2>
      <p className="instructions">
        Tu personaje comienza con <strong>3 recursos</strong>, al menos uno debe
        ser tangible.
        <br />
        <small>
          Ejemplos de tangibles: Arma, Nave, Equipo. Intangibles: Contactos,
          Influencia, Reputación.
        </small>
      </p>

      <div className="resources-grid">
        {resources.map((resource, index) => (
          <div key={index} className="resource-card">
            <div className="resource-header">
              <h3>Recurso #{index + 1}</h3>
              <label className="tangible-toggle">
                <input
                  type="checkbox"
                  checked={resource.isTangible}
                  onChange={() => handleTangibleChange(index)}
                />
                <span className="toggle-label">
                  {resource.isTangible ? "Tangible" : "Intangible"}
                </span>
              </label>
            </div>

            <label>
              Nombre del recurso:
              <input
                type="text"
                value={resource.name}
                onChange={(e) =>
                  handleResourceChange(index, "name", e.target.value)
                }
                placeholder={`Ej. ${
                  resource.isTangible ? "Crysknife" : "Contactos en la C.H.A."
                }`}
              />
            </label>

            <label>
              Descripción:
              <textarea
                value={resource.description}
                onChange={(e) =>
                  handleResourceChange(index, "description", e.target.value)
                }
                placeholder="Describe cómo obtuviste este recurso y su importancia"
                rows={3}
              />
            </label>

            {resource.isTangible && (
              <div className="tangible-badge">
                <span role="img" aria-label="Tangible">
                  🖐️
                </span>{" "}
                Recurso físico
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="validation-message">
        {resources.filter((r) => r.isTangible).length < 1 && (
          <p className="error">⚠️ Debes tener al menos un recurso tangible</p>
        )}
        {resources.filter((r) => r.name.trim()).length < 3 && (
          <p className="error">⚠️ Debes completar los 3 recursos</p>
        )}
      </div>

      <div className="step-navigation">
        <button className="btn-prev" onClick={onBack}>
          ← Volver
        </button>
        <button className="btn-next" onClick={onNext} disabled={!isFormValid()}>
          Siguiente → Toques Finales
        </button>
      </div>
    </div>
  );
};

export default Step7Resources;
