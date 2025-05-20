import { Provincia } from '../models/index.js';

// Obtener todas las provincias
export const getProvincias = async (req, res) => {
  try {
    const provincias = await Provincia.findAll();
    res.status(200).json(provincias);
  } catch (error) {
    console.error("Error al obtener provincias:", error);
    res.status(500).json({ message: 'Error al obtener provincias', error: error.message });
  }
};

// Obtener una provincia por su código
export const getProvinciaByCodigo = async (req, res) => {
  try {
    const { codigoDeProvincia } = req.params;
    const provincia = await Provincia.findByPk(codigoDeProvincia);
    if (provincia) {
      res.status(200).json(provincia);
    } else {
      res.status(404).json({ message: 'Provincia no encontrada' });
    }
  } catch (error) {
    console.error("Error al obtener provincia:", error);
    res.status(500).json({ message: 'Error al obtener provincia', error: error.message });
  }
};

// Crear una nueva provincia
export const createProvincia = async (req, res) => {
  try {
    const nuevaProvincia = await Provincia.create(req.body);
    res.status(201).json(nuevaProvincia);
  } catch (error) {
    console.error("Error al crear provincia:", error);
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({
        message: 'Error de validación',
        errors: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ message: 'Error al crear provincia', error: error.message });
  }
};

// Actualizar una provincia
export const updateProvincia = async (req, res) => {
  try {
    const { codigoDeProvincia } = req.params;
    const datosActualizar = req.body;

    const provincia = await Provincia.findByPk(codigoDeProvincia);

    if (provincia) {
      const provinciaActualizada = await provincia.update(datosActualizar);
      res.status(200).json(provinciaActualizada);
    } else {
      res.status(404).json({ message: 'Provincia no encontrada para actualizar' });
    }
  } catch (error) {
    console.error("Error al actualizar provincia:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Error de validación',
        errors: error.errors.map(e => e.message)
      });
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Eliminar una provincia
export const deleteProvincia = async (req, res) => {
  try {
    const { codigoDeProvincia } = req.params;
    const resultado = await Provincia.destroy({ where: { codigoDeProvincia } });

    if (resultado > 0) {
      res.status(200).json({ message: 'Provincia eliminada exitosamente' });
    } else {
      res.status(404).json({ message: 'Provincia no encontrada para eliminar' });
    }
  } catch (error) {
    console.error("Error al eliminar provincia:", error);
    res.status(500).json({ message: 'Error al eliminar provincia', error: error.message });
  }
};
