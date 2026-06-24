import { useEffect, useState } from "react";
import API from "../api/api";
import NavbarAdmin from "../componentes/NavbarAdmin";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const respuesta = await API.get("usuarios/");
      setUsuarios(respuesta.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  return (
    <div>
      <NavbarAdmin />

      <div className="container mt-4">
        <h2 className="mb-4">
          Administración de Usuarios
        </h2>

        <div className="card shadow">
          <div className="card-header bg-success text-white">
            Usuarios Registrados
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Fecha Registro</th>
                    <th>Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.length > 0 ? (
                    usuarios.map((usuario) => (
                      <tr key={usuario.id_usuario}>
                        <td>{usuario.id_usuario}</td>

                        <td>{usuario.nombre}</td>

                        <td>{usuario.email}</td>

                        <td>
                          {usuario.rol
                            ? usuario.rol.descripcion
                            : "Sin rol"}
                        </td>

                        <td>
                          {usuario.fecha_registro}
                        </td>

                        <td>
                          {String(usuario.activo) === "1" ? (
                            <span className="badge bg-success">
                              Activo
                            </span>
                          ) : (
                            <span className="badge bg-danger">
                              Inactivo
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No hay usuarios registrados
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;