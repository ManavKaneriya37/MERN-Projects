const projectModel = require("../models/project.model");
const mongoose = require("mongoose");

module.exports.createProject = async (name, userId) => {
  try {
    if (!name) {
      throw new Error("Please provide a name for the project");
    }
    if (!userId) {
      throw new Error("Please provide a user id");
    }

    try {
      const project = await projectModel.create({
        name,
        users: [userId],
      });
      return project;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Project name already exists");
      }
      throw error;
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAllProjectsByUserId = async (userId) => {
  try {
    if (!userId) {
      throw new Error("Please provide a user id");
    }

    const usersProjects = await projectModel.find({ users: userId });
    return usersProjects;
  } catch (error) {
    throw new Error(error);
  }
}
module.exports.addUserToProject = async ({projectId, users, userId}) => {
  try {
    if (!projectId) {
      throw new Error("Please provide a project id");
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error("Invalid project id");
    }

    if (!users || !Array.isArray(users)) {
      throw new Error("Please provide users to add");
    }
    for (const userId of users) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error(`Invalid user id: ${userId}`);
      }
    }

    if(!userId) {
      throw new Error("Please provide a user id");
    }
    if(!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user id");
    }

    const project = await projectModel.findOne({
      _id: projectId,
      users: userId,
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const updatedProject = await projectModel.findOneAndUpdate({
      _id: projectId,
    }, {
      $addToSet:{
        users: {
          $each: users
        }
      }
    }, {new: true}).populate('users');

    return updatedProject;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports.getProjectById = async (projectId) => {
  try {
    if (!projectId) {
      throw new Error("Please provide a project id");
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new Error("Invalid project id");
    }

    const project = await projectModel.findOne({
      _id: projectId,
    }).populate('users');

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    throw new Error(error);
  }
}