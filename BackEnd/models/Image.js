const mongoose =  require('mongoose');

const Image = new mongoose.Schema({
    userId: String,
    src: String,
    comment: Array,
    title: String,
    description: String,
})

module.exports = mongoose.module('Image', Image);
