const Admin = require('../models/admin');
const CrudRepository = require('./crud-repository')
class AdminRepository extends CrudRepository {

    constructor() {
        super(Admin)
    }

    async findByEmail(data) {
        try {
            const admin = await Admin.findOne({ email: data.email });
            if (!admin) {
                return false
            }
            else return true
            // return admin;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



}

module.exports = AdminRepository;