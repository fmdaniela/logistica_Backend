import { Router } from 'express';

import camionRoutes from './camiones.routes.js';
import camioneroRoutes from './camioneros.routes.js';
import paqueteRoutes from './paquetes.routes.js';
import provinciaRoutes from './provincias.routes.js';
import camioneroxcamionRoutes from './camionerosxcamiones.routes.js';

const router = Router();

router.use('/camiones', camionRoutes);
router.use('/camioneros', camioneroRoutes);
router.use('/paquetes', paqueteRoutes);
router.use('/provincias', provinciaRoutes);
router.use('/camionerosxcamiones', camioneroxcamionRoutes);

export default router;

