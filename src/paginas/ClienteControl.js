import NavbarCliente from "../componentes/NavbarCliente";

function ClienteControl(){
    const usuario =JSON.parse(localStorage.getItem("usuario"));
    return(
        <div>
            <NavbarCliente/>
            <div className="container mt-4">
                <h1>
                    Bienvenido{usuario.nombre}
                </h1>
                <p>
                    Explora el menu de la cafeteria escolar
                </p>
            </div>
        </div>
    );
}
export default ClienteControl;