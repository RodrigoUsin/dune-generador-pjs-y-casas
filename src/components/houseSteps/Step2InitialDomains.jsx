import React from "react";

const domainConfig = {
  emergente: { primary: 0, secondary: 1 },
  menor: { primary: 1, secondary: 1 },
  mayor: { primary: 1, secondary: 2 },
  gran: { primary: 2, secondary: 3 },
};

const Step2InitialDomains = ({
  houseClass,
  initialDomains,
  setInitialDomains,
  onNext,
  onBack,
}) => {
  const { type } = houseClass;
  const config = React.useMemo(() => {
    return domainConfig[type] || { primary: 0, secondary: 0 };
  }, [type]);

  const updateDomain = (index, value, field) => {
    const newDomains = [...initialDomains];
    newDomains[index] = {
      ...newDomains[index],
      [field]: value,
    };
    setInitialDomains(newDomains);
  };

  React.useEffect(() => {
    const total = config.primary + config.secondary;
    if (initialDomains.length !== total) {
      const newDomains = Array.from({ length: total }, (_, i) => ({
        ...(initialDomains[i] || {}),
        primary: initialDomains[i]?.primary || "",
        secondary: initialDomains[i]?.secondary || "",
        specialty: initialDomains[i]?.specialty || "",
        description: initialDomains[i]?.description || "",
      }));
      setInitialDomains(newDomains);
    }
  }, [config, initialDomains, setInitialDomains]);

  return (
    <div className="step-container">
      <h2>Dominios Iniciales</h2>

      {[...Array(config.primary)].map((_, index) => (
        <div key={`p-${index}`}>
          <label>
            Dominio Principal {index + 1}:
            <input
              type="text"
              className="text"
              value={initialDomains[index]?.primary || ""}
              onChange={(e) => updateDomain(index, e.target.value, "primary")}
            />
          </label>
          <label>
            Especialidad:
            <input
              type="text"
              className="text"
              value={initialDomains[index]?.specialty || ""}
              onChange={(e) => updateDomain(index, e.target.value, "specialty")}
            />
          </label>
          <label>
            Descripción del Campo:
            <input
              type="text"
              className="text"
              value={initialDomains[index]?.description || ""}
              onChange={(e) =>
                updateDomain(index, e.target.value, "description")
              }
            />
          </label>
        </div>
      ))}

      {[...Array(config.secondary)].map((_, i) => {
        const index = config.primary + i;
        return (
          <div key={`s-${i}`}>
            <label>
              Dominio Secundario {i + 1}:
              <input
                type="text"
                className="text"
                value={initialDomains[index]?.secondary || ""}
                onChange={(e) =>
                  updateDomain(index, e.target.value, "secondary")
                }
              />
            </label>
            <label>
              Especialidad:
              <input
                type="text"
                className="text"
                value={initialDomains[index]?.specialty || ""}
                onChange={(e) =>
                  updateDomain(index, e.target.value, "specialty")
                }
              />
            </label>
            <label>
              Descripción del Campo:
              <input
                type="text"
                className="text"
                value={initialDomains[index]?.description || ""}
                onChange={(e) =>
                  updateDomain(index, e.target.value, "description")
                }
              />
            </label>
          </div>
        );
      })}

      <button onClick={onBack}>← Volver</button>
      <button
        onClick={onNext}
        disabled={[...Array(config.primary + config.secondary)].some((_, i) => {
          const d = initialDomains[i];
          return (
            !d ||
            (i < config.primary ? !d.primary?.trim() : !d.secondary?.trim()) ||
            !d.specialty?.trim() ||
            !d.description?.trim()
          );
        })}
      >
        Siguiente → Planeta natal
      </button>
    </div>
  );
};

export default Step2InitialDomains;
