import React, { useEffect, useState } from "react";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/productos/")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Administración de Productos</h2>

      <div className="card shadow">
        <div className="card-header bg-success text-white">
          Productos Registrados
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Estado</th>
                </tr>
              </thead>

              <tbody>
                {productos.map((p) => (
                  <tr key={p.id_productos}>
                    <td>{p.id_productos}</td>
                    <td>{p.nombre}</td>
                    <td>{p.descrpcion}</td>
                    <td>${p.precio}</td>

                    <td>
                      {p.stock > 0 ? (
                        <span className="badge bg-success">{p.stock}</span>
                      ) : (
                        <span className="badge bg-danger">Agotado</span>
                      )}
                    </td>

                    {/* ESTADO CORREGIDO */}
                    <td>
                      {Number(p.activo) === 1 ? (
                        <span className="badge bg-success">Activo</span>
                      ) : (
                        <span className="badge bg-danger">Inactivo</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productos;