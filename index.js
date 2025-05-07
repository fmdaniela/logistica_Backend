// index.js (en la raíz del proyecto) - Versión Actualizada
import express from 'express';
// Importa desde el index de modelos (nota el /index.js)
import { sequelize, Camionero, Camion, Paquete, Provincia, CamioneroxCamion } from './src/models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

// --- AQUÍ IRÍAN TUS RUTAS API ---
// Obtenemos todos los camioneros
app.get('/camioneros', async (req, res) => {
    try {
        const camioneros = await Camionero.findAll();
        res.json(camioneros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener camioneros' });
    }
});

// Obtenemos todos los camiones
app.get('/camiones', async (req, res) => {
  try {
    const camiones = await Camion.findAll();
    res.json(camiones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener camiones' });
  }
});
// ... Define más rutas ...


// Iniciar servidor y sincronizar DB
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // Sincroniza los modelos con la base de datos.
    // force: false (default) - No borra tablas si existen.
    // force: true - Borra y recrea tablas. ¡PELIGROSO en producción!
    // alter: true - Intenta modificar tablas existentes.
    await sequelize.sync({ force: false }); // Cambia bajo tu propio riesgo
    console.log('🔄 Modelos sincronizados con la base de datos.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
}

startServer();

