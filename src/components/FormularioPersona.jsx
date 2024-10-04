import React, { useState } from "react";
import "./FormularioPersona.css"

function FormularioPersona() {
  const [persona, setPersona] = useState({
    nombre: "",
    apellidos: "",
    identificacion: "",
    fechaNacimiento: "",
    ciudadResidencia: "",
    pais: "",
    comentario: "",
  });

  const handleChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando datos:", persona);
      const response = await fetch("http://localhost:5000/api/personas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(persona),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        console.log("Respuesta del servidor:", result);
        if (response.ok) {
          alert("Persona guardada exitosamente");
          setPersona({
            nombre: "",
            apellidos: "",
            identificacion: "",
            fechaNacimiento: "",
            ciudadResidencia: "",
            pais: "",
            comentario: "",
          });
        } else {
          alert(`Error al guardar la persona: ${result.message}`);
        }
      } else {
        const text = await response.text();
        console.error("Respuesta no JSON del servidor:", text);
        alert(`Error inesperado del servidor: ${text}`);
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert(`Error de red al guardar la persona: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="nombre"
        name="nombre"
        value={persona.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        className="nombre"
        name="apellidos"
        value={persona.apellidos}
        onChange={handleChange}
        placeholder="Apellidos"
        required
      />
      <input
        className="nombre"
        name="identificacion"
        value={persona.identificacion}
        onChange={handleChange}
        placeholder="No. de Identificación"
        required
      />
      <input
        className="nombre"
        name="fechaNacimiento"
        value={persona.fechaNacimiento}
        onChange={handleChange}
        type="date"
        required
      />
      <input
        className="nombre"
        name="ciudadResidencia"
        value={persona.ciudadResidencia}
        onChange={handleChange}
        placeholder="Ciudad de Residencia"
        required
      />
      <input
        className="nombre"
        name="pais"
        value={persona.pais}
        onChange={handleChange}
        placeholder="País"
        required
      />
      <textarea
        className="nombre"
        name="comentario"
        value={persona.comentario}
        onChange={handleChange}
        placeholder="Comentario"
      ></textarea>
      <button type="submit">Guardar</button>
    </form>
  );
}

export default FormularioPersona;
