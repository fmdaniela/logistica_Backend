import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Nota la extensión .js

const Camion = sequelize.define('Camion', {
    dominio: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacidadCarga: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'camiones',
    timestamps: false,
  });

export default Camion;