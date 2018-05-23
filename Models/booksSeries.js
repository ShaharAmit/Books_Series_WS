const mongoose = require('mongoose'),
      booksSeries = new mongoose.Schema({
        seriesName: String,
        author: String,
        genre: [String],
        releaseYear: Number,
        filmed: Boolean,
        books: [{
            bookName: String,
            releaseYear: Number
        }]
      }, {collection: 'booksSeries'});

const BooksSeries = mongoose.model('BooksSeries', booksSeries);

module.exports = BooksSeries;