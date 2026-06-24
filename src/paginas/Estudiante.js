import React, { useState } from "react";
import ProductosCliente from "./ProductosCliente";

function Estudiante() {
  const [vista, setVista] = useState("inicio");

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  return (
    <div>

      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#28a745" }}
      >
        <div className="container">


          <span
            className="navbar-brand text-white"
            style={{ cursor: "pointer" }}
            onClick={() => setVista("inicio")}
          >
            Home
          </span>

          <div className="d-flex gap-2">

            <button
              className="btn btn-light"
              onClick={() => setVista("productos")}
            >
              Platillos disponibles
            </button>

            <button
              className="btn btn-light"
              onClick={() => setVista("datos")}
            >
              Mis datos
            </button>

            <button
              className="btn btn-danger"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>

          </div>
        </div>
      </nav>


      <div className="container mt-4">


        <h3 className="mb-3">
          {vista === "inicio" && `Bienvenido, ${usuario?.nombre}`}
          {vista === "productos" && "Platillos disponibles"}
          {vista === "datos" && "Mis datos"}
        </h3>

        {vista === "inicio" && (
          <p>Selecciona una opción del menú para comenzar.</p>
        )}

        {vista === "productos" && <ProductosCliente />}

        {vista === "datos" && (
          <div className="card shadow mt-3">
            <div className="card-header bg-primary text-white">
              Mis datos
            </div>

            <div className="card-body">
              <p><strong>ID:</strong> {usuario?.id_usuario}</p>
              <p><strong>Nombre:</strong> {usuario?.nombre}</p>
              <p><strong>Email:</strong> {usuario?.email}</p>
              <p><strong>Rol:</strong> {usuario?.rol?.descripcion}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Estudiante;