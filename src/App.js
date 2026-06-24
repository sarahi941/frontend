import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import Login from "./paginas/Login";
import Estudiante from "./paginas/Estudiante";
import AdminControl1 from "./paginas/AdminControl";
import Categorias from "./paginas/Categorias";
import Usuarios from "./paginas/Usuarios";
import Pedidos from "./paginas/Pedidos";
import AdminRoute from "./componentes/AdminRoute";
import ClienteRoute from "./componentes/ClienteRoute";
import ProductosNuevo from "./paginas/ProductosNuevo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
        <AdminRoute>
          <AdminControl1/>
        </AdminRoute>
        }/>
        <Route path="/usuarios" element={
          <AdminRoute>
            <Usuarios/>
          </AdminRoute>
        }/>
        <Route path="/estudiante" element={
          <ClienteRoute>
            <Estudiante/>
          </ClienteRoute>
        } />
        
        <Route path="/categorias" element={
          <AdminRoute>
            <Categorias/>
          </AdminRoute>
        } />
        <Route path="/pedidos" element={
          <AdminRoute>
            <Pedidos/>
          </AdminRoute>
        } />
        <Route path="/Productos" element={
          <AdminRoute>
            <ProductosNuevo/>
          </AdminRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;