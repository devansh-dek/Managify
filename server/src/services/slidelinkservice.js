const { slidelinkRepository } = require('../repository');
const slidelinkrepo = new slidelinkRepository();
class SlideLinkService {

    async create(data) {
        try {
            const response = await slidelinkrepo.create(data);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            const response = await slidelinkrepo.destroy(id);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteAll() {
        try {
            const result = await slidelinkrepo.deleteAll({});
            return result;
        } catch (error) {
            console.log("Something went wrong in the crud Repository");
            throw error;
        }
    }

}

module.exports = SlideLinkService;