const projectModel = require("../models/project.model");

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
