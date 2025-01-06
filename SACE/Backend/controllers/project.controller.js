const projectService = require("../services/project.service");
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");

module.exports.createProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name } = req.body;
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    const userId = loggedInUser._id.toString();

    const project = await projectService.createProject(name, userId);
    return res.status(201).json(project);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.getAllProjects = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({ email: req.user.email });
    const userId = loggedInUser._id.toString();

    const projects = await projectService.getAllProjectsByUserId(userId);
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.addUserToProject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { projectId, users } = req.body;

    const loggedInUser = await userModel.findOne({ email: req.user.email });

    const project = await projectService.addUserToProject({
      projectId,
      users,
      userId: loggedInUser._id,
    });

    return res.status(200).json({ project });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

module.exports.getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await projectService.getProjectById(projectId);
    return res.status(200).json(project);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.updateFileTree = async (req, res) => {
  try {
    const { projectId, fileTree } = req.body;
    const project = await projectService.updateFileTree({
      projectId,
      fileTree,
    });
    return res.status(200).json(project);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
