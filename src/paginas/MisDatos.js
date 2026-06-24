import { useEffect, useState } from "react";
import NavbarCliente from "../componentes/NavbarCliente";

function MisDatos() {

    const [usuario, setUsuario] = useState(null);
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);
    if (!usuario) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    No hay una sesión activa.
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavbarCliente />
        <div className="container mt-5">
            
            <div className="card shadow">

                <div className="card-header bg-success text-white">
                    <h3>Mis Datos</h3>
                </div>

                <div className="card-body">

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <strong>ID Usuario:</strong>
                        </div>
                        <div className="col-md-8">
                            {usuario.id_usuario}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <strong>Nombre:</strong>
                        </div>
                        <div className="col-md-8">
                            {usuario.nombre}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <strong>Correo Electrónico:</strong>
                        </div>
                        <div className="col-md-8">
                            {usuario.email}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <strong>Rol:</strong>
                        </div>
                        <div className="col-md-8">
                            {
                                usuario.rol
                                    ? usuario.rol.nombre
                                    : usuario.id_rol
                            }
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <strong>Fecha Registro:</strong>
                        </div>
                        <div className="col-md-8">
                            {usuario.fecha_registro}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <strong>Estado:</strong>
                        </div>
                        <div className="col-md-8">
                            {usuario.activo === 1
                                ? "Activo"
                                : "Inactivo"}
                        </div>
                    </div>

                </div>

            </div>

        </div>
        </div>
    );
}

export default MisDatos;