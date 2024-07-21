const { AnnoucementService } = require('../services');
const annoucementService = new AnnoucementService();
const create = async (req, res) => {
    try {
        const annoucement = {
            annoucement: req.body.annoucement
        }
        const response = await annoucementService.create(annoucement);
        return res.status(200).json({
            data: {},
            success: true,
            message: 'Announcement added successfully',
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
const deleteAnnoucement = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await annoucementService.delete(id);
        return res.status(200).json({
            data: task,
            success: true,
            message: 'Successfully deleted the Annoucement',
            error: {}
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to delete annoucement',
            error: error
        });
    }
}
const viewAnnoucements = async (req, res) => {
    try {
        const response = await annoucementService.view();
        console.log("our response is ", response);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'annoucements fetched successfully',
            error: {}
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to fetch Annoucements',
            error: error
        });
    }
}
module.exports = {
    create,
    deleteAnnoucement,
    viewAnnoucements
}