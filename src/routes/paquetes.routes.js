import { Router } from 'express';
import {
  getPaquetes,
  getPaqueteById,
  createPaquete,
  updatePaquete,
  deletePaquete
} from '../controllers/paqueteController.js';

const router = Router();

router.get('/', getPaquetes);
router.get('/:id', getPaqueteById);
router.post('/', createPaquete);
router.put('/:id', updatePaquete);
router.delete('/:id', deletePaquete);

export default router;
