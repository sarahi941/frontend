import NavbarAdmin from "../componentes/NavbarAdmin";
import { Link } from "react-router-dom";

function AdminControl1() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    return (
        <div>
            <NavbarAdmin />

            <div className="container mt-4">
                <h1>Panel de Administrador</h1>
                <hr />
                <h4>Bienvenido {usuario?.nombre}</h4>

                <div className="row mt-4">

                    
                    <div className="col-md-3">
                        <Link to="/productos" style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="card p-3 shadow" style={{ cursor: "pointer" }}>
                                <h5>Productos</h5>
                                <p>Gestión de Productos</p>
                            </div>
                        </Link>
                    </div>

                    
                    <div className="col-md-3">
                        <Link to="/categorias" style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="card p-3 shadow" style={{ cursor: "pointer" }}>
                                <h5>Categorías</h5>
                                <p>Gestión de Categorías</p>
                            </div>
                        </Link>
                    </div>

                    
                    <div className="col-md-3">
                        <Link to="/usuarios" style={{ textDecoration: "none", color: "inherit" }}>
                            <div className="card p-3 shadow" style={{ cursor: "pointer" }}>
                                <h5>Usuarios</h5>
                                <p>Gestión de Usuarios</p>
                            </div>
                        </Link>
                    </div>

                    
               

                </div>
            </div>
        </div>
    );
}

export default AdminControl1;