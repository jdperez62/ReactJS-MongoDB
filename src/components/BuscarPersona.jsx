import React, { useState } from "react";

function BuscarPersona({ onEditarPersona }) {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/personas/buscar?q=${busqueda}`
      );
      if (response.ok) {
        const data = await response.json();
        setResultados(data);
      } else {
        alert("Error al buscar personas");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al buscar personas");
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          className="nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar persona..."
        />
        <button type="submit">Buscar</button>
      </form>
      <ul>
        {resultados.map((persona) => (
          <li key={persona._id}>
            Nombre: {persona.nombre} {persona.apellidos}.  CI: {persona.identificacion}. Ciudad: {persona.ciudadResidencia}
            <button className="edit-button" onClick={() => onEditarPersona(persona)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuscarPersona;
