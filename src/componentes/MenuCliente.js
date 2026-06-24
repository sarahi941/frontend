import { useEffect, useState } from "react";
import API from "../api/api";
import NavbarCliente from "../componentes/NavbarCliente";

function MenuCliente() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await API.get("productos/");
      setProductos(res.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };
  return (
    <div>
      <NavbarCliente />
      <div className="row p-3">
        {productos.map((p) => (
          <div className="col-md-4" key={p.id_producto}>
            <div className="card shadow p-3 m-2">
              <h4>{p.nombre}</h4>
              <p>{p.descripcion}</p>
              <h5>${p.precio}</h5>
              <button className="btn btn-success">
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuCliente;