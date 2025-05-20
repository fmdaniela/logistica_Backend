import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Nota la extensión .js

const Paquete = sequelize.define('Paquete', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    domicilio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cuilCamionero: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'camioneros', 
        key: 'cuil'
      }
    },
    codigoDeProvincia: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'provincias', 
        key: 'codigoDeProvincia'
      }
    }
  }, {
    tableName: 'paquetes',
    timestamps: false,
  });

export default Paquete;