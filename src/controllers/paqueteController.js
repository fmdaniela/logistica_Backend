import { Paquete } from '../models/index.js';

// Obtener todos los paquetes
export const getPaquetes = async (req, res) => {
  try {
    const paquetes = await Paquete.findAll();
    res.status(200).json(paquetes);
  } catch (error) {
    console.error("Error al obtener paquetes:", error);
    res.status(500).json({ message: 'Error al obtener paquetes', error: error.message });
  }
};

// Obtener un paquete por ID
export const getPaqueteById = async (req, res) => {
  try {
    const { id } = req.params;
    const paquete = await Paquete.findByPk(id);

    if (paquete) {
      res.status(200).json(paquete);
    } else {
      res.status(404).json({ message: 'Paquete no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener paquete:", error);
    res.status(500).json({ message: 'Error al obtener paquete', error: error.message });
  }
};

// Crear un nuevo paquete
export const createPaquete = async (req, res) => {
  try {
    const nuevoPaquete = await Paquete.create(req.body);
    res.status(201).json(nuevoPaquete);
  } catch (error) {
    console.error("Error al crear paquete:", error);
    res.status(500).json({ message: 'Error al crear paquete', error: error.message });
  }
};

// Actualizar un paquete por ID
export const updatePaquete = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizar = req.body;

    const paquete = await Paquete.findByPk(id);

    if (paquete) {
      const paqueteActualizado = await paquete.update(datosActualizar);
      res.status(200).json(paqueteActualizado);
    } else {
      res.status(404).json({ message: 'Paquete no encontrado para actualizar' });
    }
  } catch (error) {
    console.error("Error al actualizar paquete:", error);
    res.status(500).json({ message: 'Error al actualizar paquete', error: error.message });
  }
};

// Eliminar un paquete por ID
export const deletePaquete = async (req, res) => {
  try {
    const { id } = req.params;

    const paquete = await Paquete.findByPk(id);

    if (paquete) {
      await paquete.destroy();
      res.status(200).json({ message: 'Paquete eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Paquete no encontrado para eliminar' });
    }
  } catch (error) {
    console.error("Error al eliminar paquete:", error);
    res.status(500).json({ message: 'Error al eliminar paquete', error: error.message });
  }
};
