const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",       // Cambia si tu MySQL está en otro host
  user: "TU_USUARIO",      // Tu usuario MySQL
  password: "TU_CONTRASEÑA", // Tu contraseña MySQL
  database: "TU_BASE_DE_DATOS" // Tu base de datos
});

db.connect(err => {
  if (err) throw err;
  console.log("Conectado a MySQL!");
});

// Ruta para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  db.query("SELECT id, nombre, email FROM usuarios", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Puerto del servidor
app.listen(5000, () => {
  console.log("Servidor escuchando en http://localhost:5000");
});