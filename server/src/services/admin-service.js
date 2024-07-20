const { AdminRepository } = require('../repository');
const adminRepository = new AdminRepository();

class AdminService {
    async isAdmin(data) {
        try {
            const isAdmin = await adminRepository.findByEmail(data);
            return isAdmin;
        }
        catch (error) {
            throw error;
        }
    }
    async createadmin(data) {
        try {
            const response = await adminRepository.create(data);
            return response;
        }
        catch (error) {
            throw error
        }
    }
}
module.exports = AdminService;