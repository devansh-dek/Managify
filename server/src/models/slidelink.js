const mongoose = require('mongoose');


const slidelinkSchema = new mongoose.Schema({
    slidelink: {
        type: String,
        required: true
    }
});




const slidelink = mongoose.model("slidelink ", slidelinkSchema);

module.exports = slidelink;