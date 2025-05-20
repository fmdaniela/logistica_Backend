import { Router } from 'express';
import {
  getRelaciones,
  getRelacionById,
  createRelacion,
  replaceRelacion,
  updateRelacion,
  deleteRelacion
} from '../controllers/camioneroxcamionController.js';

const router = Router();

router.get('/', getRelaciones);
router.get('/:id', getRelacionById);
router.post('/', createRelacion);
router.put('/:id', replaceRelacion);
router.patch('/:id', updateRelacion);
router.delete('/:id', deleteRelacion);

export default router;
