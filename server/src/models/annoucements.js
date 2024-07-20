const mongoose = require('mongoose');


const AnnoucementsSchema = new mongoose.Schema({
    annoucement: {
        type: String,
        required: true

    }
});




const Annoucements = mongoose.model("Annoucements ", AnnoucementsSchema);

module.exports = Annoucements;