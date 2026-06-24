import { useEffect, useState } from "react";
import API from "../api/api";
import NavbarAdmin from "../componentes/NavbarAdmin";

function ProductosNuevo() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [nuevoproducto, setNuevoProducto] = useState({
        nombre: "",
        descrpcion: "",
        precio: "",
        stock: "",
        imagen: "",
        id_categoria: "",
        activo: 1
    });
    const [editarproducto, setEditarProducto] = useState({
        nombre: "",
        id_productos: "",
        descrpcion: "",
        precio: "",
        stock: "",
        imagen: "",
        id_categoria: "",
        activo: 1
    });
    useEffect(() => {
        cargarProductos();
        cargarCategorias();
    }, []);

    const cargarProductos = async () => {
        try {
            const respuesta = await API.get("productos/");
            setProductos(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarCategorias = async () => {
        try {
            const respuesta = await API.get("categorias/");
            setCategorias(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };
    const abrirEditar = (producto) => {
        setEditarProducto({
            id_productos: producto.id_productos,
            nombre: producto.nombre,
            descrpcion: producto.descrpcion,
            precio: producto.precio,
            stock: producto.stock,
            imagen: producto.imagen,
            id_categoria: producto.id_categoria,
            activo: producto.activo
        });
    };
    const guardarproducto = async () => {
        try {
            await API.post("productos/", nuevoproducto);
            alert("Producto agregado correctamente");
            cargarProductos();

            setNuevoProducto({
                nombre: "",
                descrpcion: "",
                precio: "",
                stock: "",
                imagen: "",
                id_categoria: "",
                activo: 1
            });
        } catch (error) {
            console.error(error);
            alert("Error al agregar nuevo producto");
        }
    };

    const eliminarProducto = async (id) => {
        const confirmar = window.confirm("¿Quieres eliminar este producto?");
        if (!confirmar) return;

        try {
            await API.delete(`productos/${id}/`);
            cargarProductos();
        } catch (error) {
            console.error(error);
        }
    };
    const actualizarProducto = async () => {
        try {
            await API.put(`productos/${editarproducto.id_productos}/`, editarproducto);
            alert("Producto Actualizado");
            cargarProductos();
        } catch (error) {
            console.error(error);
            alert("Error al Actualizar");
        }
    };
    return (
        <div>
            <NavbarAdmin />

            <div className="container mt-4">
                <h2>Administración de Productos</h2>
                <hr />

                <button
                    className="btn btn-success mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#modalProducto"
                >
                    Agregar Producto
                </button>

                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id_productos}>
                                <td>{producto.id_productos}</td>

                                <td>
                                    {producto.imagen ? (
                                        <img
                                            src={producto.imagen}
                                            alt={producto.nombre}
                                            width="80"
                                            height="80"
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "8px"
                                            }}
                                        />
                                    ) : (
                                        "Sin imagen"
                                    )}
                                </td>

                                <td>{producto.nombre}</td>
                                <td>${producto.precio}</td>
                                <td>{producto.stock}</td>

                                <td>
                                    {producto.categoria
                                        ? producto.categoria.nombre
                                        : "Sin categoría"}
                                </td>

                                <td>
                                    {producto.activo === "1" ? (
                                        <span className="badge bg-success">Activo</span>
                                    ) : (
                                        <span className="badge bg-danger">Inactivo</span>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" data-bs-toggle="modal" data-bs-target="#modalEditar" onClick={() => abrirEditar(producto)}>Editar</button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarProducto(producto.id_productos)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="modal fade" id="modalProducto" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">Producto Nuevo</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                            />
                        </div>

                        <div className="modal-body">

                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nuevoproducto.nombre}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoproducto,
                                            nombre: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descripción</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={nuevoproducto.descrpcion}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoproducto,
                                            descrpcion: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={nuevoproducto.precio}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoproducto,
                                            precio: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Stock</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={nuevoproducto.stock}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoproducto,
                                            stock: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Imagen</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nuevoproducto.imagen}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoproducto,
                                            imagen: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Categoría</label>
                                <select
                                    className="form-select"
                                    value={nuevoproducto.id_categoria}
                                    onChange={(e) =>
                                        setNuevoProducto({
                                            ...nuevoproducto,
                                            id_categoria: e.target.value
                                        })
                                    }
                                >
                                    <option value="">
                                        Seleccione una categoría
                                    </option>

                                    {categorias.map((categoria) => (
                                        <option
                                            key={categoria.id_categoria}
                                            value={categoria.id_categoria}
                                        >
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-success"
                                onClick={guardarproducto}
                            >
                                Guardar
                            </button>

                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalEditar" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header bg-warning ">
                            <h5 className="modal-title">Editar Producto</h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal" />
                        </div>

                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editarproducto.nombre}
                                    onChange={(e) =>
                                        setEditarProducto({
                                            ...editarproducto,
                                            nombre: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Descripción</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={editarproducto.descrpcion}
                                    onChange={(e) =>
                                        setEditarProducto({
                                            ...editarproducto,
                                            descrpcion: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Precio</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={editarproducto.precio}
                                    onChange={(e) =>
                                        setEditarProducto({
                                            ...editarproducto,
                                            precio: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Stock</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={editarproducto.stock}
                                    onChange={(e) =>
                                        setEditarProducto({
                                            ...editarproducto,
                                            stock: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Imagen</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editarproducto.imagen}
                                    onChange={(e) =>
                                        setEditarProducto({
                                            ...editarproducto,
                                            imagen: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Categoría</label>
                                <select
                                    className="form-select"
                                    value={editarproducto.id_categoria}
                                    onChange={(e) =>
                                        setEditarProducto({
                                            ...editarproducto,
                                            id_categoria: e.target.value
                                        })
                                    }
                                >
                                    <option value="">
                                        Seleccione una categoría
                                    </option>
                                    {categorias.map((categoria) => (
                                        <option
                                            key={categoria.id_categoria}
                                            value={categoria.id_categoria}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-warning" onClick={actualizarProducto}>Actualizado</button>
                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductosNuevo;