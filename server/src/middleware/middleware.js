const { AdminService } = require('../services/index');
const adminService = new AdminService();

const adminMiddleware = async (req, res, next) => {
    try {
        const adminEmail = req.body.email;
        const isAdmin = await adminService.isAdmin(adminEmail);

        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admins only.',
            });
        }
        next();
    } catch (error) {
        console.log("Error in admin check:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};

module.exports = adminMiddleware;
