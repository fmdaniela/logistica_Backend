// src/models/index.js
import sequelize from '../db/connection.js';

// Importa todos los modelos (nota las extensiones .js)
import Camionero from './Camionero.js';
import Camion from './Camion.js';
import Paquete from './Paquete.js';
import Provincia from './Provincia.js';
import CamioneroxCamion from './CamioneroxCamion.js';
      

// --- Definir Asociaciones ---

// Camionero 1:N Paquete
Camionero.hasMany(Paquete, {
    foreignKey: 'cuilCamionero',
    sourceKey: 'cuil'
  });
  Paquete.belongsTo(Camionero, {
    foreignKey: 'cuilCamionero',
    targetKey: 'cuil'
  });
  
  // Paquete N:1 Provincia
  Provincia.hasMany(Paquete, {
    foreignKey: 'codigoDeProvincia',
    sourceKey: 'codigoDeProvincia'
  });
  Paquete.belongsTo(Provincia, {
    foreignKey: 'codigoDeProvincia',
    targetKey: 'codigoDeProvincia'
  });
  
  // Camionero N:M Camion 
  Camionero.belongsToMany(Camion, {
    through: CamioneroxCamion,
    foreignKey: 'cuilCamionero',
    otherKey: 'dominioCamion',
    unique: false
  });
  Camion.belongsToMany(Camionero, {
    through: CamioneroxCamion,
    foreignKey: 'dominioCamion',
    otherKey: 'cuilCamionero',
    unique: false
  });

  // Asociaciones inversas para el include en la tabla intermedia 
  //Estas líneas crean la asociación directa desde la tabla intermedia hacia los modelos, que es lo que Sequelize necesita para resolver los include.
  CamioneroxCamion.belongsTo(Camionero, {
    foreignKey: 'cuilCamionero',
  });

  CamioneroxCamion.belongsTo(Camion, {
    foreignKey: 'dominioCamion',
  });

  //Otra forma de hacer la relación Camionero N:M Camion 

  // // Camionero N:M Camion   
  // Camionero.belongsToMany(Camion, {
  //   through: CamioneroxCamion
  // });

  // Camion.belongsToMany(Camionero, {
  //   through: CamioneroxCamion
  // });

// Exporta la instancia de sequelize y todos los modelos usando named exports
export {
    sequelize,
    Camionero,
    Camion,
    Paquete,
    Provincia,
    CamioneroxCamion
  };
