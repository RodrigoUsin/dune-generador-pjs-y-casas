import * as React from "react";
import Layout from "../components/layout";
import "../styles/global.css";

const IndexPage = () => {
  return (
    <Layout title="Mentat asistente.">
      <main>
        <h1>Inicio.</h1>
        <p>
          Bienvenid@ al asistente de preación de personajes para Dune: Aventuras
          en el Immerio. Por favor, selecciona una de las opciones de la barra
          de navegación para comenzar a crear tu personaje, tu casa o tu planeta
        </p>
        <p>
          "Es en el momento de empezar cuando hay que cuidar atentamente que los
          equilibrios queden establecidos de la manera más exacta. Y esto lo
          sabe bien cada hermana Bene Gesserit."
        </p>
        <br />
        <span>— Princesa Iluran</span>
      </main>
    </Layout>
  );
};

export default IndexPage;
