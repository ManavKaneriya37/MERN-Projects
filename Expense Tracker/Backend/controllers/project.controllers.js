import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ProjectModel from "../models/project.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";

const createProject = asyncHandler(async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    if (name === "" || !userId) {
      throw new ApiError(400, "Necessary fields are required.");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(400, "Invalid project-id");
    }

    const verifyUser = await UserModel.findById(userId);
    if (!verifyUser) {
      throw new ApiError(401, "Unauthorized user");
    }

    const project = await ProjectModel.create({
      name,
      description,
      user: userId,
    });

    await UserModel.findByIdAndUpdate(req.user._id, {
      $push: {
        projects: project._id,
      },
    });

    if (!project) {
      throw new ApiError(500, "Something went wrong with creating project");
    }

    return res
      .status(200)
      .json(new ApiResponse(201, project, "Project created successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const updateProject = asyncHandler(async (req, res) => {
  try {
    const { name, description, _id } = req.body;

    if (!_id) {
      throw new ApiError(400, "Project-id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new ApiError(400, "Invalid project-id");
    }

    const existingProject = await ProjectModel.findOneAndUpdate(
      { _id: _id },
      {
        name,
        description,
      }
    );

    if (!existingProject) {
      throw new ApiError(401, "Something went wrong while updating project");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Project details updated successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.body;

    if (!projectId) {
      throw new ApiError(400, "Project-id is required");
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new ApiError(400, "Invalid project-id");
    }

    const deletedProject = await ProjectModel.findOneAndDelete({
      _id: projectId,
    });
    const getProject = await ProjectModel.findById(
      deletedProject._id.toString()
    );
    if (getProject) {
      throw new ApiError(500, "Something went wrong with deleting the project");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Project deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getAllProjects = asyncHandler(async (req, res) => {
  try {
    if (!req.user?._id) {
      throw new ApiError(401, "Unauthorized access");
    }
    // const projects = await ProjectModel.find({user: req.user._id}).populate("user");

    const projects = await ProjectModel.find({ user: req.user._id });

    return res
      .status(200)
      .json(new ApiResponse(200, projects, "Projects fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getSingleProject = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      throw new ApiError(400, "Project-id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new ApiError(400, "Invalid project-id");
    }
    const project = await ProjectModel.findById(projectId).populate("user");
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, project, "Project fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
};
