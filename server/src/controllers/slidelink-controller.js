// const { SlideLinkService } = require('../services');
const SlideLinkService = require('../services/slidelinkservice')
const slideLinkService = new SlideLinkService();

const create = async (req, res) => {
    try {
        const slidelink = {
            slidelink: req.body.slidelink
        }
        const response = await slideLinkService.create(slidelink);
        return res.status(200).json({
            data: {},
            success: true,
            message: 'sidelink added successfully',
            error: {}
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to add announcement',
            error: error
        });
    }
}
const deleteAll = async (req, res) => {
    try {
        const resposne = await slideLinkService.deleteAll();
        return res.status(200).json({
            data: {},
            success: true,
            message: 'sidelink deleted successfully',
            error: {}
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to delete preivous slidelink',
            error: error
        });
    }
}
module.exports = {
    create,
    deleteAll
}