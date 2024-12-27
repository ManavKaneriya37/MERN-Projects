const projectModel = require('../models/project.model');

module.exports.createProject = async (
    name,
    userId
) => {
    try {
        if(!name) {
            throw new Error("Please provide a name for the project");
        }
        if(!userId) {
            throw new Error("Please provide a user id");
        }

        
        const project = await projectModel.craete({
            name,
            users: [userId]
        })

        return project;

    } catch (error) {
        throw new Error(error);
    }
}