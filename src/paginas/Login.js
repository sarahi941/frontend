import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await API.get("usuarios/");
      const usuarios = res.data;
      const user = usuarios.find(
        u => u.email === email && u.password === password
      );
      if (!user) {
        alert("Credenciales incorrectas");
        return;
      }
      localStorage.setItem("usuario", JSON.stringify(user));

      if(user.rol.id_rol === 1){
        navigate("/admin");
      }else{
        navigate("/estudiante");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Ocurrió un error al iniciar sesión");
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <div className="text-center mb-4">
          <p className="text-muted">Iniciar sesión para continuar</p>
          <h3 className="text-success">Cafetería Escolar</h3>
        </div>

        <div className="mb-3">

          <label>Correo electrónico</label>

          <input

            type="email"

            className="form-control"

            placeholder="correo@escuela.edu"

            value={email}

            onChange={e => setEmail(e.target.value)}

          />

        </div>



        <div className="mb-3">

          <label>Contraseña</label>

          <input

            type="password"

            className="form-control"

            placeholder="********"

            value={password}

            onChange={e => setPassword(e.target.value)}

          />

        </div>



        <div className="d-grid">

          <button className="btn btn-success btn-lg" onClick={handleLogin}>

            Iniciar sesión

          </button>

        </div>

      </div>

    </div>

  );

}



export default Login;