import React, { useState, useEffect } from "react";

function EditarPersona({ persona, onPersonaActualizada }) {
  const [personaData, setPersonaData] = useState({
    nombre: "",
    apellidos: "",
    identificacion: "",
    fechaNacimiento: "",
    ciudadResidencia: "",
    pais: "",
    comentario: "",
  });

  useEffect(() => {
    if (persona) {
      setPersonaData({
        ...persona,
        fechaNacimiento: persona.fechaNacimiento
          ? persona.fechaNacimiento.split("T")[0]
          : "",
      });
    }
  }, [persona]);

  const handleChange = (e) => {
    setPersonaData({ ...personaData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Enviando datos:", personaData);
      const response = await fetch(
        `http://localhost:5000/api/personas/${persona._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(personaData),
        }
      );

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        console.log("Respuesta del servidor:", result);
        if (response.ok) {
          alert("Persona actualizada exitosamente");
          onPersonaActualizada();
        } else {
          alert(`Error al actualizar la persona: ${result.message}`);
        }
      } else {
        const text = await response.text();
        console.error("Respuesta no JSON del servidor:", text);
        alert(`Error inesperado del servidor: ${text}`);
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert(`Error de red al actualizar la persona: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={personaData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        name="apellidos"
        value={personaData.apellidos}
        onChange={handleChange}
        placeholder="Apellidos"
        required
      />
      <input
        name="identificacion"
        value={personaData.identificacion}
        onChange={handleChange}
        placeholder="No. de Identificación"
        required
      />
      <input
        name="fechaNacimiento"
        value={personaData.fechaNacimiento}
        onChange={handleChange}
        type="date"
        required
      />
      <input
        name="ciudadResidencia"
        value={personaData.ciudadResidencia}
        onChange={handleChange}
        placeholder="Ciudad de Residencia"
        required
      />
      <input
        name="pais"
        value={personaData.pais}
        onChange={handleChange}
        placeholder="País"
        required
      />
      <textarea
        name="comentario"
        value={personaData.comentario}
        onChange={handleChange}
        placeholder="Comentario"
      ></textarea>
      <button type="submit">Actualizar</button>
    </form>
  );
}

export default EditarPersona;
