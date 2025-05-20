import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Nota la extensión .js

const Camionero = sequelize.define('Camionero', {
    cuil: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    domicilio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salario: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'camioneros',
    timestamps: false,
  });

export default Camionero;
