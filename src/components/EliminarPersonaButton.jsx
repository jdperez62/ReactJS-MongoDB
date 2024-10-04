import React from "react";

function EliminarPersonaButton({ personaId, onPersonaEliminada }) {
  const handleEliminar = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta persona?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/personas/${personaId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("Persona eliminada exitosamente");
          onPersonaEliminada();
        } else {
          const errorData = await response.json();
          alert(`Error al eliminar la persona: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error al eliminar persona:", error);
        alert("Error al eliminar la persona. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <button
      onClick={handleEliminar}
      style={{ marginLeft: "10px", color: "red" }}
    >
      Eliminar
    </button>
  );
}

export default EliminarPersonaButton;
