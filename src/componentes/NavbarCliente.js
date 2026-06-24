import { Link, useNavigate } from "react-router-dom";

function NavbarCliente() {
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
        <nav className="navbar navbar-success">
            <div className="container"> 
                <Link className="navbar-brand" to="/estudiante">Home</Link>

                <div className="d-flex gap-2">
                    <Link className="btn btn-outline-light" to="/datos">Mis Datos</Link>

                    <Link className="btn btn-outline-light" to="/productos">
                        Productos
                    </Link>

                    <button className="btn btn-light" onClick={logout}>
                        Cerrar sesión
                    </button>
                </div>

            </div>
        </nav>
    );
}

export default NavbarCliente;