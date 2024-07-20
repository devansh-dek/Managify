const AdminRepository = require("./admin-repository");
const AnnouncementRepository = require("./announcement-repository");
const CrudRepository = require("./crud-repository");
const slidelinkRepository = require("./slidelink-repository");
const UserRepository = require("./user-repository");

module.exports = {
    CrudRepository,
    UserRepository,
    AdminRepository,
    AnnouncementRepository,
    slidelinkRepository
}