import * as React from "react";
import { Link } from "gatsby";
import backgroundImage from "../images/banner-desktop.png";
import { FaHome } from "react-icons/fa";
import "../styles/pages-css/404.css";

const NotFoundPage = () => {
  return (
    <main
      className="not-found-page"
      style={{ "--bg-image": `url(${backgroundImage})` }}
    >
      <h1 className="not-found-heading">404, Página no encontrada</h1>
      <p className="not-found-paragraph">
        Lo que buscabas lo ha reclamado Shai-Hulud...
      </p>
      <Link to="/" className="house-link">
        <FaHome className="house-icon" />
      </Link>
    </main>
  );
};

export default NotFoundPage;
