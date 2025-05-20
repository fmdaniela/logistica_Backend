import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Nota la extensión .js

const Provincia = sequelize.define('Provincia', {
    codigoDeProvincia: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idPaquete: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'paquetes', 
            key: 'id'
          }
        },
  }, {
    tableName: 'provincias',
    timestamps: false,
  });

export default Provincia;