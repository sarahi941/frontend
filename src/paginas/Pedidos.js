import { useEffect, useState } from "react";
import API from "../api/api";
import NavbarAdmin from "../componentes/NavbarAdmin";

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try {
            const respuesta = await API.get("pedidos/");
            setPedidos(respuesta.data);
        } catch (error) {
            console.error("Error al cargar pedidos:", error);
        }
    };

    return (
        <div>
            <NavbarAdmin />

            <div className="container mt-4">
                <h2 className="mb-4">
                    Administración de Pedidos
                </h2>

                <div className="card shadow">

                    <div className="card-header bg-success text-white">
                        Pedidos Registrados
                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-striped table-hover">

                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Usuario</th>
                                        <th>Fecha</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {pedidos.map((pedido) => (

                                        <tr key={pedido.id_pedido}>

                                            <td>
                                                {pedido.id_pedido}
                                            </td>

                                            <td>
                                                {pedido.id_usuario?.nombre || "Desconocido"}
                                            </td>

                                            <td>
                                                {pedido.fecha}
                                            </td>

                                            <td>

                                                {pedido.estado === "pendiente" ? (
                                                    <span className="badge bg-warning text-dark">
                                                        Pendiente
                                                    </span>
                                                ) : pedido.estado === "completado" ? (
                                                    <span className="badge bg-success">
                                                        Completado
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-danger">
                                                        {pedido.estado}
                                                    </span>
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

        </div>
    );
}

export default Pedidos;