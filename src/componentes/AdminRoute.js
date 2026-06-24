import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (usuario.rol.id_rol !== 1) {
    return <Navigate to="/estudiante" />;
  }

  return children;
}

export default AdminRoute;