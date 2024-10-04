import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mi_base_de_datos')
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

const PersonaSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  identificacion: String,
  fechaNacimiento: Date,
  ciudadResidencia: String,
  pais: String,
  comentario: String,
});

const Persona = mongoose.model('Persona', PersonaSchema);

app.post('/api/personas', async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    const nuevaPersona = new Persona(req.body);
    const personaGuardada = await nuevaPersona.save();
    console.log('Persona guardada:', personaGuardada);
    res.status(201).json(personaGuardada);
  } catch (error) {
    console.error('Error al guardar persona:', error);
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/personas/buscar', async (req, res) => {
  try {
    const { q } = req.query;
    const personas = await Persona.find({
      $or: [
        { nombre: new RegExp(q, 'i') },
        { apellidos: new RegExp(q, 'i') },
        { identificacion: new RegExp(q, 'i') },
        { ciudadResidencia: new RegExp(q, 'i') },
        { pais: new RegExp(q, 'i') },
      ]
    });
    res.json(personas);
  } catch (error) {
    console.error('Error al buscar personas:', error);
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/personas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const actualizacion = req.body;
    console.log('ID recibido:', id);
    console.log('Datos de actualización recibidos:', actualizacion);

    const persona = await Persona.findByIdAndUpdate(id, actualizacion, { new: true, runValidators: true });

    if (!persona) {
      console.log('Persona no encontrada');
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    console.log('Persona actualizada:', persona);
    res.json(persona);
  } catch (error) {
    console.error('Error al actualizar persona:', error);
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));