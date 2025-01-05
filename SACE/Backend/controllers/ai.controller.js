const ai = require('../services/ai.service');

module.exports.getResult = async (req, res) => {
    try {
        const { prompt } = req.body;
        const result = await ai.generateResult(prompt);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}