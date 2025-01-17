import {Router} from 'express'
import {createProject, updateProject, deleteProject, getAllProjects} from '../controllers/project.controllers.js'
import {verifyUser} from '../middlewares/auth.middleware.js'

const router = Router();

router.route('/create').post(verifyUser, createProject);
router.route('/update').post(verifyUser, updateProject);
router.route('/delete').post(verifyUser, deleteProject);
router.route('/get-all').get(verifyUser, getAllProjects);

export default router;