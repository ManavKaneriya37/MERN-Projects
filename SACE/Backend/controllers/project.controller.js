const projectService = require('../services/project.service');
const { validationResult } = require('express-validator');
const userModel = require('../models/user.model'); 

module.exports.createProject = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const {name} = req.body;
        const loggedInUser = await userModel.findOne({email: req.user.email});
        const userId = loggedInUser._id.toString();

        const project = await projectService.createProject(name,userId);
        return res.status(201).json(project);

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
