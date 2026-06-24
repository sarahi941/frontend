import React, { useEffect, useState, useCallback } from "react";
import API from "../api/api";

function ProductosCliente() {
  const [productosUI, setProductosUI] = useState([]);

  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });

  const [carritoOpen, setCarritoOpen] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const cargarProductos = useCallback(async () => {
    try {
      const res = await API.get("productos/");
      const activos = (res.data || []).filter(
        (p) => Number(p.activo) === 1
      );
      setProductosUI(activos);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const getStockDisponible = (producto) => {
    const item = carrito.find(
      (p) => p.id_productos === producto.id_productos
    );

    return item
      ? Number(producto.stock) - Number(item.cantidad)
      : Number(producto.stock);
  };

  const agregarAlCarrito = (producto) => {
    const stockDisponible = getStockDisponible(producto);

    if (stockDisponible <= 0) {
      alert("Ya no hay stock disponible");
      return;
    }

    setCarrito((prev) => {
      const item = prev.find(
        (p) => p.id_productos === producto.id_productos
      );

      if (item) {
        return prev.map((p) =>
          p.id_productos === producto.id_productos
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });


    alert("Producto agregado al carrito");
  };

  const sumar = (producto) => {
    const stockDisponible = getStockDisponible(producto);

    if (stockDisponible <= 0) {
      alert("No hay más stock disponible");
      return;
    }

    setCarrito((prev) =>
      prev.map((p) =>
        p.id_productos === producto.id_productos
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      )
    );
  };

  const restar = (id) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          p.id_productos === id
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const total = carrito.reduce(
    (acc, item) =>
      acc + Number(item.precio) * Number(item.cantidad),
    0
  );

  const realizarPedido = async () => {
    try {
      const pedido = {
        id_usuario: usuario?.id_usuario,
        estado: "Pendiente",
        fecha: new Date().toISOString().split("T")[0],
        total: total,
        observaciones: "Pedido realizado desde cliente",
      };

      const res = await API.post("pedidos/", pedido);
      console.log("PEDIDO RESPONSE:", res);

      const id_pedido = res.data.id_pedido || res.data.id;

      if (!id_pedido) {
        throw new Error("No se recibió id del pedido");
      }

      for (const item of carrito) {
        const subtotal =
          Number(item.precio) * Number(item.cantidad);

        await API.post("detalles/", {
          id_pedido: id_pedido,
          id_producto: item.id_productos,
          cantidad: item.cantidad,
          precio_unitario: item.precio,
          subtotal,
        });

        const productoBackend = productosUI.find(
          (p) => p.id_productos === item.id_productos
        );

        if (productoBackend) {
          const nuevoStock =
            Number(productoBackend.stock) - Number(item.cantidad);

          await API.patch(
            `productos/${item.id_productos}/`,
            {
              stock: nuevoStock >= 0 ? nuevoStock : 0,
            }
          );
        }
      }

      alert("Pedido realizado correctamente");
      setCarrito([]);
      localStorage.removeItem("carrito");
      setCarritoOpen(false);

      await cargarProductos();
    } catch (error) {
      console.error(" ERROR:", error.response?.data || error);
      alert("Error al realizar pedido");
    }
  };

  const hayProductos = productosUI.some((p) => p.stock > 0);

  return (
    <div className="container mt-4">

      {!hayProductos && (
        <div className="alert alert-danger text-center">
          Ya no hay productos disponibles
        </div>
      )}

      <button
        className="btn btn-dark"
        onClick={() => setCarritoOpen(true)}
        style={{
          position: "fixed",
          top: "15px",
          right: "15px",
          zIndex: 9999,
        }}
      >
        🚕 {carrito.reduce((a, b) => a + b.cantidad, 0)}
      </button>

      <div className="row mt-3">
        {productosUI.map((p) => (
          <div className="col-md-4 mb-4" key={p.id_productos}>
            <div className="card shadow">
              <img
                src={p.imagen}
                className="card-img-top"
                alt={p.nombre || "Producto"}
                style={{
                  height: "220px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <h5>{p.nombre}</h5>
                <p>Precio: ${p.precio}</p>
                <p>Stock: {getStockDisponible(p)}</p>

                <button
                  className={`btn w-100 ${
                    getStockDisponible(p) > 0
                      ? "btn-success"
                      : "btn-secondary"
                  }`}
                  onClick={() => agregarAlCarrito(p)}
                  disabled={getStockDisponible(p) <= 0}
                >
                  {getStockDisponible(p) > 0
                    ? "Agregar"
                    : "Sin stock"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {carritoOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "360px",
            height: "100vh",
            background: "#fff",
            boxShadow: "-5px 0 15px rgba(0,0,0,0.2)",
            zIndex: 10000,
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <div className="d-flex justify-content-between">
            <h5>Carrito de Compras</h5>
            <button onClick={() => setCarritoOpen(false)}>✖</button>
          </div>

          {carrito.length === 0 ? (
            <p>No hay productos</p>
          ) : (
            carrito.map((item) => (
              <div key={item.id_productos} className="mb-3">
                <strong>{item.nombre}</strong>

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => restar(item.id_productos)}
                  >
                    -
                  </button>

                  <span style={{ minWidth: "25px", textAlign: "center", fontWeight: "bold" }}>
                    {item.cantidad}
                  </span>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => sumar(item)}
                  >
                    +
                  </button>
                </div>

                <small>${item.precio * item.cantidad}</small>
              </div>
            ))
          )}

          <hr />

          <h5>Total: ${total}</h5>

          <button
            className="btn btn-primary w-100"
            onClick={realizarPedido}
          >
            Comprar
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductosCliente;