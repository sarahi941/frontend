import { useNavigate } from "react-router-dom";

function NavbarAdmin() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if(!usuario || usuario.rol.id_rol !==1){
    return null;
    
  }
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Administracion Cafeteria</span>
      <div className="d-flex gap-2">
        <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/productos")}>Productos</button>
        <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/categorias")}>Categorías</button>
        <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/usuarios")}>Usuarios</button>
        <button className="btn btn-danger btn-sm" onClick={logout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}

export default NavbarAdmin;