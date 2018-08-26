var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var moment = require('moment');
var now = moment();

var bookSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    pageCount: {
        type: Number,
        required: true,
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: () => now.format('x')
    }

})

var book = mongoose.model('Book', bookSchema);
module.exports = book;