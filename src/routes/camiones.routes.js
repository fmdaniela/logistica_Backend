import { Router } from 'express';
import {
  getCamiones,
  getCamionByDominio,
  createCamion,
  updateCamion,
  deleteCamion
} from '../controllers/camionController.js';

const router = Router();

router.get('/', getCamiones);
router.get('/:dominio', getCamionByDominio);
router.post('/', createCamion);
router.put('/:dominio', updateCamion);
router.delete('/:dominio', deleteCamion);

export default router;
