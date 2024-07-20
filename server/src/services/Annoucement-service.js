const { AnnouncementRepository } = require('../repository');
const annoucerepo = new AnnouncementRepository();
class AnnoucementService {

    async create(data) {
        try {
            const response = await annoucerepo.create(data);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const resposne = await annoucerepo.destroy(id);
            return resposne;
        }
        catch (error) {
            throw error;
        }
    }

}

module.exports = AnnoucementService;