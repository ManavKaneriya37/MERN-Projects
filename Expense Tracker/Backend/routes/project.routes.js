import { Router } from "express";
import {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
} from "../controllers/project.controllers.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyUser, createProject);
router.route("/get/:projectId").get(verifyUser, getSingleProject);
router.route("/get-all").get(verifyUser, getAllProjects);
router.route("/update").post(verifyUser, updateProject);
router.route("/delete").post(verifyUser, deleteProject);

export default router;
