const slidelink = require('../models/slidelink');
const CrudRepository = require("./crud-repository");

class slidelinkRepository extends CrudRepository {
    constructor() {
        super(slidelink);
    }
    async deleteAll() {
        try {
            const result = await slidelink.deleteMany({});
            return result;
        } catch (error) {
            console.log("Something went wrong in the crud Repository");
            throw error;
        }
    }

}
module.exports = slidelinkRepository;