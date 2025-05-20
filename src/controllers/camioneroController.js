import { Camionero } from '../models/index.js';

// Obtener todos los camioneros
export const getCamioneros = async (req, res) => {
  try {
    const camioneros = await Camionero.findAll();
    res.status(200).json(camioneros);
  } catch (error) {
    console.error("Error al obtener camioneros:", error);
    res.status(500).json({ message: 'Error al obtener camioneros', error: error.message });
  }
};

// Obtener un camionero por CUIL
export const getCamioneroByCuil = async (req, res) => {
  try {
    const { cuil } = req.params;
    const camionero = await Camionero.findByPk(cuil);
    if (camionero) {
      res.status(200).json(camionero);
    } else {
      res.status(404).json({ message: 'Camionero no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener camionero:", error);
    res.status(500).json({ message: 'Error al obtener camionero', error: error.message });
  }
};

// Crear un nuevo camionero
export const createCamionero = async (req, res) => {
  try {
    const nuevoCamionero = await Camionero.create(req.body);
    res.status(201).json(nuevoCamionero);
  } catch (error) {
    console.error("Error al crear camionero:", error);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: 'Error de validación',
        errors: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Actualizar un camionero
export const updateCamionero = async (req, res) => {
  try {
    const { cuil } = req.params;
    const datosActualizar = req.body;
    const camionero = await Camionero.findByPk(cuil);

    if (camionero) {
      const camioneroActualizado = await camionero.update(datosActualizar);
      res.status(200).json(camioneroActualizado);
    } else {
      res.status(404).json({ message: 'Camionero no encontrado para actualizar' });
    }
  } catch (error) {
    console.error("Error al actualizar camionero:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Error de validación',
        errors: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Eliminar un camionero
export const deleteCamionero = async (req, res) => {
  try {
    const { cuil } = req.params;
    const resultado = await Camionero.destroy({ where: { cuil } });

    if (resultado > 0) {
      res.status(200).json({ message: 'Camionero eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Camionero no encontrado para eliminar' });
    }
  } catch (error) {
    console.error("Error al eliminar camionero:", error);
    res.status(500).json({ message: 'Error al eliminar camionero', error: error.message });
  }
};
