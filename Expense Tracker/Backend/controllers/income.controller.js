import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import IncomeModel from "../models/income.model.js";

const createIncome = asyncHandler(async (req, res) => {
  try {
    const { tag, amount, category, projectId } = req.body;

    if (tag === "" || amount <= 0) {
      throw new ApiError(400, "Mendatory fields are required.");
    }

    var createdIncome;
    if (projectId) {
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new ApiError(403, "Invalid project ID.");
        process.exit(1);
      }

      createdIncome = await IncomeModel.create({
        tag,
        amount,
        category,
        project: projectId,
        user: req.user._id,
      });
    } else {
      createdIncome = await IncomeModel.create({
        tag,
        amount,
        category,
        user: req.user._id,
      });
    }

    if (!createdIncome) {
      throw new ApiError(500, "Something went wrong with creating expense.");
    }

    res
      .status(200)
      .json(new ApiResponse(201, createdIncome, "Income created successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const deleteIncome = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      throw new ApiError(400, "Income Id required.");
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(403, "Income Id is not in valid format");
    }

    await IncomeModel.findByIdAndDelete(id);
    const deletedIncome = await IncomeModel.findById(id);
    if (deletedIncome) {
      throw new ApiError(
        500,
        "Something went wrong with deleting the expense."
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Income deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getIncomesTotal = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.body;

    if (req.body.userId) {
      if (!mongoose.Types.ObjectId.isValid(req.body.userId)) {
        throw new ApiError(403, "User Id is not in valid format");
      }

      const total = await IncomeModel.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(req.body.userId),
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);
      return res
        .status(200)  
        .json(new ApiResponse(200, total[0]?.total, "Total income"));
    }

    if (projectId) {
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new ApiError(403, "Project Id is not in valid format");
      }

      const total = await IncomeModel.aggregate([
        {
          $match: {
            project: new mongoose.Types.ObjectId(projectId),
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);

      return res
        .status(200)
        .json(new ApiResponse(200, total[0]?.total, "Total income"));
    } else {
      const total = await IncomeModel.aggregate([
        {
          $match: {
            project: { $exists: false },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);

      return res
        .status(200)
        .json(new ApiResponse(200, total[0]?.total, "Total income"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getIncomes = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.body;
    if (projectId) {
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new ApiError(403, "Invalid project id");
      }
      const incomes = await IncomeModel.find({
        project: new mongoose.Types.ObjectId(projectId),
      }).sort({ date: 1 });
      return res
        .status(200)
        .json(new ApiResponse(200, incomes, "Project Incomes"));
    } else {
      const incomes = await IncomeModel.find({
        project: { $exists: false },
      }).sort({ date: -1 });
      return res
        .status(200)
        .json(new ApiResponse(200, incomes, "General Incomes"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getIncomesByUserId = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(403, "Invalid project id");
      }
      const incomes = await IncomeModel.find({ user: userId }).populate("project");
      return res
        .status(200)
        .json(new ApiResponse(200, incomes, "User Incomes"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getAllIncomes = asyncHandler(async (req, res) => {
  try {
    const { userId  } = req.body;
    const incomes = await IncomeModel.find({user: userId})
    return res
      .status(200)
      .json(new ApiResponse(200, incomes, "All Incomes"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  createIncome,
  deleteIncome,
  getIncomesTotal,
  getIncomes,
  getIncomesByUserId,
  getAllIncomes
};
