import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">

        <Link className="navbar-brand" to="/">
          CAFETERIA ESCOLAR
        </Link>

        <Link className="btn btn-light" to="/login">
          Iniciar Sesión
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;