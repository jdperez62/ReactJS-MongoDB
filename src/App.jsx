import React, { useState } from "react";
import FormularioPersona from "./components/FormularioPersona";
import BuscarPersona from "./components/BuscarPersona";
import EditarPersona from "./components/EditarPersona";
import "./App.css";

function App() {
  const [vista, setVista] = useState("formulario");
  const [personaSeleccionada, setPersonaSeleccionada] = useState(null);

  const cambiarVista = (nuevaVista, persona = null) => {
    setVista(nuevaVista);
    setPersonaSeleccionada(persona);
  };

  return (
    <div className="App">
      <h1>Gestión de Personas</h1>
      <div>
        <button onClick={() => cambiarVista("formulario")}>Agregar Persona</button>
        <button onClick={() => cambiarVista("buscar")}>Buscar Persona</button>
      </div>
      {vista === "formulario" && <FormularioPersona />}
      {vista === "buscar" && (<BuscarPersona onEditarPersona={(persona) => cambiarVista("editar", persona)}/>)}
      {vista === "editar" && personaSeleccionada && (
        <EditarPersona
          persona={personaSeleccionada}
          onPersonaActualizada={() => cambiarVista("buscar")}
        />
      )}
    </div>
  );
}

export default App;
