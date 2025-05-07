import * as React from "react";
import Layout from "../components/layout";
import Step1HouseClass from "../components/houseSteps/Step1HouseClass";
import Step2InitialDomains from "../components/houseSteps/Step2InitialDomains";
import Step3HomeWorld from "../components/houseSteps/Step3HomeWolrd";

const HousesPage = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [selectedHouse, setSelectedHouse] = React.useState(null);
  const [selectedHouseClass, setSelectedHouseClass] = React.useState(null);
  const [initialDomains, setInitialDomains] = React.useState({});
  const [homeWorld, setHomeWorld] = React.useState({});
  const [selectedHouseTrait, setSelectedHouseTrait] = React.useState(null);
  const [selectedHouseRole, setSelectedHouseRole] = React.useState(null);
  const [selectedHouseEnemy, setSelectedHouseEnemy] = React.useState(null);
  const [houseClass, setHouseClass] = React.useState({
    name: "",
    description: "",
    trait: "",
    initialDomains: [],
    homePlanet: "",
    banner: "",
    weapons: [],
    houseTrait: "",
    roles: [],
    enemies: [],
  });

  const steps = [
    "1. Tipo de Casa",
    "2. Dominios iniciales",
    "3. Planeta natal",
    "4. Estandarte y Armas",
    "5. Rasgo de Casa",
    "6. Roles",
    "7. Enemigos",
  ];

  return (
    <Layout title={"Creación de Casa"}>
      <div className="house-creation">
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
        {
          {
            1: (
              <Step1HouseClass
                houseClass={houseClass}
                setHouseClass={setHouseClass}
                onNext={() => setCurrentStep(2)}
              />
            ),
            2: (
              <Step2InitialDomains
                houseClass={houseClass}
                initialDomains={initialDomains}
                setInitialDomains={setInitialDomains}
                onBack={() => setCurrentStep(1)}
                onNext={() => setCurrentStep(3)}
              />
            ),
            3: (
              <Step3HomeWorld
                homeWorld={homeWorld}
                setHomeWorld={setHomeWorld}
                onBack={() => setCurrentStep(2)}
                onNext={() => setCurrentStep(4)}
              />
            ),
            4: <div>Estandarte y Armas</div>,
            5: <div>Rasgo de Casa</div>,
            6: <div>Roles</div>,
            7: <div>Enemigos</div>,
          }[currentStep]
        }{" "}
        {/*pasos de los componentes en la creación de la casa*/}
      </div>
    </Layout>
  );
};

export default HousesPage;
