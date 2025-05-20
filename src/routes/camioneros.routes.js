import { Router } from 'express';
import {
  getCamioneros,
  getCamioneroByCuil,
  createCamionero,
  updateCamionero,
  deleteCamionero
} from '../controllers/camioneroController.js';

const router = Router();

router.get('/', getCamioneros);
router.get('/:cuil', getCamioneroByCuil);
router.post('/', createCamionero);
router.put('/:cuil', updateCamionero);
router.delete('/:cuil', deleteCamionero);

export default router;
