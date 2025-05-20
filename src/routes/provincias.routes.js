import { Router } from 'express';
import {
  getProvincias,
  getProvinciaByCodigo,
  createProvincia,
  updateProvincia,
  deleteProvincia
} from '../controllers/provinciaController.js';

const router = Router();

router.get('/', getProvincias);
router.get('/:codigoDeProvincia', getProvinciaByCodigo);
router.post('/', createProvincia);
router.put('/:codigoDeProvincia', updateProvincia);
router.delete('/:codigoDeProvincia', deleteProvincia);

export default router;
