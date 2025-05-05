import * as React from "react";
import Layout from "../components/layout";
import Step1Concept from "../components/characterSteps/Step1Concept";
import Step2Archetype from "../components/characterSteps/Step2Archetype";
import Step3Skills from "../components/characterSteps/Step3Skills";
import Step4Specialties from "../components/characterSteps/Step4Specialties";
import Step5Talents from "../components/characterSteps/Step5Talents";
import Step6Motivations from "../components/characterSteps/Step6Motivations";
import Step7Resources from "../components/characterSteps/Step7Resources";
import Step8FinalTouches from "../components/characterSteps/Step8FinalTouches";

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
  const [talents, setTalents] = React.useState({
    talent1: "",
    desc1: "",
    talent2: "",
    desc2: "",
    talent3: "",
    desc3: "",
  });
  const [motivations, setMotivations] = React.useState(
    Array(5)
      .fill()
      .map(() => ({
        name: "",
        score: null,
        slogan: "",
      }))
  );
  const [resources, setResources] = React.useState([]);
  const [finalTouches, setFinalTouches] = React.useState({
    reputationTrait: "",
    ambition: "",
    name: "",
    personality: "",
    appearance: "",
    relationships: "",
  });

  // Aquí se guarda el personaje, mostrar resumen, etc
  const handleComplete = () => {
    alert("¡Personaje creado con éxito!");
    console.log({
      concept,
      archetype,
      skills,
      specialties,
      talents,
      motivations,
      resources,
      finalTouches,
    });
  };

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

        {/*pasos de los componentes en la creación del personaje*/}
        {
          {
            1: (
              <Step1Concept
                concept={concept}
                setConcept={setConcept}
                onNext={() => setCurrentStep(2)}
              />
            ),
            2: (
              <Step2Archetype
                archetype={archetype}
                setArchetype={setArchetype}
                skillTranslations={skillTranslations}
                onBack={() => setCurrentStep(1)}
                onNext={() => setCurrentStep(3)}
              />
            ),

            3: (
              <Step3Skills
                skills={skills}
                setSkills={setSkills}
                archetype={archetype}
                skillTranslations={skillTranslations}
                onBack={() => setCurrentStep(2)}
                onNext={() => setCurrentStep(4)}
              />
            ),

            4: (
              <Step4Specialties
                specialties={specialties}
                setSpecialties={setSpecialties}
                archetype={archetype}
                skillTranslations={skillTranslations}
                //getSpecialtySuggestion={getSpecialtySuggestion}
                onBack={() => setCurrentStep(3)}
                onNext={() => setCurrentStep(5)}
              />
            ),
            5: (
              <Step5Talents
                talents={talents}
                setTalents={setTalents}
                onBack={() => setCurrentStep(4)}
                onNext={() => setCurrentStep(6)}
              />
            ),
            6: (
              <Step6Motivations
                motivations={motivations}
                setMotivations={setMotivations}
                onBack={() => setCurrentStep(5)}
                onNext={() => setCurrentStep(7)}
              />
            ),
            7: (
              <Step7Resources
                resources={resources}
                setResources={setResources}
                onNext={() => setCurrentStep(8)}
                onBack={() => setCurrentStep(6)}
              />
            ),
            8: (
              <Step8FinalTouches
                finalTouches={finalTouches}
                setFinalTouches={setFinalTouches}
                onComplete={handleComplete}
                onBack={() => setCurrentStep(7)}
              />
            ),
          }[currentStep]
        }
      </div>
    </Layout>
  );
};

export default CharacterPage;
