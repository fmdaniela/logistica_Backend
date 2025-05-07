import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js'; // Nota la extensión .js

const CamioneroxCamion = sequelize.define('CamioneroxCamion', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
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
    dominioCamion: {
      type: DataTypes.STRING,
      allowNull: false,
      eferences: {
        model: 'camiones', 
        key: 'dominio'
      }
    }
  }, {
    tableName: 'camionerosxcamiones',
    timestamps: false
  });

  export default CamioneroxCamion;
  