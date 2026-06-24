import { Navigate } from "react-router-dom";

function ClienteRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  console.log("Llego a ClienteRoute", usuario);


  if (!usuario) {
    return <Navigate to="/login" />;
  }


  if (usuario.rol.id_rol === 1) {
    return <Navigate to="/admin" />;
  }


  return children;
}

export default ClienteRoute;