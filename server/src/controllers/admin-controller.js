const { AdminService } = require('../services/index');
const adminService = new AdminService();

const isAdmin = async (req, res) => {
    try {
        const adminEmail = {
            email: req.body.email,
        }
        const isAdmin = await adminService.isAdmin(adminEmail);
        if (!isAdmin) {
            return res.status(200).json({
                data: {},
                success: true,
                isAdmin: false,
                error: {}
            });
        }
        else {
            return res.status(200).json({
                data: {},
                success: true,
                isAdmin: true,
                error: {}
            });
        }
    }
    catch (error) {
        console.log("error in admin is ", error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to sign up',
            error: error
        });
    }
}
const createAdmin = async (req, res) => {
    try {
        const admin = {
            email: req.body.email
        }
        const response = await adminService.createadmin(admin);
        return res.status(200).json({
            data: {},
            success: true,
            admin: response,
            error: error
        });
    }
    catch (error) {
        console.log("error is ", error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Failed to add admin',
            error: error
        });
    }
}
module.exports = {
    isAdmin,
    createAdmin
}