import { CamioneroxCamion, Camionero, Camion } from '../models/index.js';

// Obtener todas las relaciones
export const getRelaciones = async (req, res) => {
  try {
    const relaciones = await CamioneroxCamion.findAll({
      include: [
        { model: Camionero, attributes: ['cuil', 'nombre'] },
        { model: Camion, attributes: ['dominio', 'modelo'] }
      ]
    });
    res.status(200).json(relaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener relaciones', error: error.message });
  }
};

// Obtener una relación por ID
export const getRelacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CamioneroxCamion.findByPk(id, {
      include: [
        { model: Camionero, attributes: ['cuil', 'nombre'] },
        { model: Camion, attributes: ['dominio', 'modelo'] }
      ]
    });
    if (relacion) {
      res.status(200).json(relacion);
    } else {
      res.status(404).json({ message: 'Relación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la relación', error: error.message });
  }
};

// Crear una nueva relación
export const createRelacion = async (req, res) => {
  try {
    const nuevaRelacion = await CamioneroxCamion.create(req.body);
    const relacionConDetalles = await CamioneroxCamion.findByPk(nuevaRelacion.id, {
      include: [
        { model: Camionero, attributes: ['cuil', 'nombre'] },
        { model: Camion, attributes: ['dominio', 'modelo'] }
      ]
    });
    res.status(201).json(relacionConDetalles || nuevaRelacion);
  } catch (error) {
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'SequelizeForeignKeyConstraintError' ||
      error.name === 'SequelizeUniqueConstraintError'
    ) {
      return res.status(400).json({
        message: 'Error de validación o FK',
        errors: error.errors ? error.errors.map(e => e.message) : error.message
      });
    }
    res.status(500).json({ message: 'Error al crear relación', error: error.message });
  }
};

// Reemplazar completamente una relación
export const replaceRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CamioneroxCamion.findByPk(id);
    if (!relacion) {
      return res.status(404).json({ message: 'Relación no encontrada para reemplazar' });
    }

    const { cuilCamionero, dominioCamion, fecha } = req.body;
    if (!cuilCamionero || !dominioCamion || !fecha) {
      return res.status(400).json({ message: 'Faltan datos obligatorios para PUT' });
    }

    await relacion.update({ cuilCamionero, dominioCamion, fecha });

    const actualizada = await CamioneroxCamion.findByPk(id, {
      include: [
        { model: Camionero, attributes: ['cuil', 'nombre'] },
        { model: Camion, attributes: ['dominio', 'modelo'] }
      ]
    });

    res.status(200).json(actualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al hacer PUT sobre relación', error: error.message });
  }
};

// Actualizar parcialmente una relación
export const updateRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CamioneroxCamion.findByPk(id);
    if (relacion) {
      const { cuilCamionero, dominioCamion, ...datosActualizables } = req.body;
      const actualizada = await relacion.update(datosActualizables);
      res.status(200).json(actualizada);
    } else {
      res.status(404).json({ message: 'Relación no encontrada para actualizar' });
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Error al actualizar relación', error: error.message });
  }
};

// Eliminar una relación
export const deleteRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await CamioneroxCamion.destroy({ where: { id } });
    if (resultado > 0) {
      res.status(200).json({ message: 'Relación eliminada exitosamente' });
    } else {
      res.status(404).json({ message: 'Relación no encontrada para eliminar' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar relación', error: error.message });
  }
};
