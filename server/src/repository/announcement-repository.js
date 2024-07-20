const Annoucements = require("../models/annoucements")
const CrudRepository = require("./crud-repository")

class AnnouncementRepository extends CrudRepository {
    constructor() {
        super(Annoucements);
    }


}
module.exports = AnnouncementRepository;