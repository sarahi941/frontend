import { useEffect, useState } from "react";
import API from "../api/api";
import NavbarAdmin from "../componentes/NavbarAdmin";

function Categorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const respuesta = await API.get("categorias/");
            setCategorias(respuesta.data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    return (
        <div>
            <NavbarAdmin />

            <div className="container mt-4">
                <h2 className="mb-4">
                    Administración de Categorías
                </h2>

                <div className="card shadow">

                    <div className="card-header bg-success text-white">
                        Categorías Registradas
                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-striped table-hover">

                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {categorias.map((categoria) => (

                                        <tr key={categoria.id_categoria}>

                                            <td>
                                                {categoria.id_categoria}
                                            </td>

                                            <td>
                                                {categoria.nombre}
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

export default Categorias;