import { Camion } from '../models/index.js';

// Obtener todos los camiones
export const getCamiones = async (req, res) => {
  try {
    const camiones = await Camion.findAll();
    res.status(200).json(camiones);
  } catch (error) {
    console.error("Error al obtener camiones:", error);
    res.status(500).json({ message: 'Error al obtener camiones', error: error.message });
  }
};

// Obtener un camión por dominio
export const getCamionByDominio = async (req, res) => {
  try {
    const { dominio } = req.params;
    const camion = await Camion.findByPk(dominio);
    if (camion) {
      res.status(200).json(camion);
    } else {
      res.status(404).json({ message: 'Camion no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener camion por dominio:", error);
    res.status(500).json({ message: 'Error al obtener camion', error: error.message });
  }
};

// Crear un nuevo camión
export const createCamion = async (req, res) => {
  try {
    const nuevoCamion = await Camion.create(req.body);
    res.status(201).json(nuevoCamion);
  } catch (error) {
    console.error("Error al crear camion:", error);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error al crear camion', error: error.message });
  }
};

// Actualizar un camión existente
export const updateCamion = async (req, res) => {
  try {
    const { dominio } = req.params;
    const datosActualizar = req.body;

    const camion = await Camion.findByPk(dominio);

    if (camion) {
      const camionActualizado = await camion.update(datosActualizar);
      res.status(200).json(camionActualizado);
    } else {
      res.status(404).json({ message: 'Camión no encontrado para actualizar' });
    }
  } catch (error) {
    console.error("Error al actualizar camión:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Error de validación',
        errors: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Eliminar un camión
export const deleteCamion = async (req, res) => {
  try {
    const { dominio } = req.params;
    const resultado = await Camion.destroy({ where: { dominio } });
    if (resultado > 0) {
      res.status(200).json({ message: 'Camion eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Camion no encontrado para eliminar' });
    }
  } catch (error) {
    console.error("Error al eliminar camion:", error);
    res.status(500).json({ message: 'Error al eliminar camion', error: error.message });
  }
};
