var express = require('express');
var router = express.Router();

var path = require('path');

var bookModel = require('./models/bookSchema');

// GET requests
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/html/index.html'))
});

router.get('/bookShow/:isPageNoSorted/:page', (req, res) => {
    var isPageNoSorted = req.params.isPageNoSorted || false;
    var page = req.params.page || 1;
    var perPage = 5;
    if (isPageNoSorted == "true") {
        bookModel.find({
                isDeleted: false
            }).sort('-pageCount')
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, data) => {
                if (data) {
                    if (data.length > 0) {
                        bookModel.find({
                            isDeleted: false
                        }).count().exec((err, count) => {
                            res.render(
                                'main/bookShow', {
                                    books: data,
                                    pages: Math.ceil(count / perPage),
                                    currentPage: page
                                }
                            );
                        })
                    } else {
                        res.send("Not enough data! Hajiiii :))")
                    }
                } else if (err) {
                    console.log(err)
                }
            })
    } else {
        bookModel.find({
                isDeleted: false
            }).sort('-createdAt')
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, data) => {
                if (data) {
                    if (data.length > 0) {
                        bookModel.find({
                            isDeleted: false
                        }).count().exec((err, count) => {
                            res.render(
                                'main/bookShow', {
                                    books: data,
                                    pages: Math.ceil(count / perPage),
                                    currentPage: page
                                }
                            );
                        })
                    } else {
                        res.send("Not enough data! Hajiiii :))")
                    }
                } else if (err) {
                    console.log(err)
                }
            })
    }
});

router.get('/deletedBooks', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/html/deletedBooks.html'));
});

router.get('/deletedBookList/:isPageNoSorted', (req, res) => {
    var isPageNoSorted = req.params.isPageNoSorted;
    if (isPageNoSorted == "true") {
        bookModel.find({
            isDeleted: true
        }).sort('-pageCount').exec((err, data) => {
            if (data) {
                res.send(data);
            } else if (err) {
                console.log(err)
            }
        })
    } else {
        bookModel.find({
            isDeleted: true
        }).sort('-createdAt').exec((err, data) => {
            if (data) {
                res.send(data);
            }
        })
    }

})


// POST requests
router.post('/bookSubmit', (req, res) => {
    var bookInfo = new bookModel({
        name: req.body.bookName,
        pageCount: req.body.pageCount
    })
    bookInfo.save((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Book saved!');
            res.redirect('/bookShow/false/1')
        }
    })

});

router.post('/delete/:bookname', (req, res) => {
    bookName = req.params.bookname;
    bookModel.findOneAndUpdate({
        name: bookName
    }, {
        $set: {
            isDeleted: true
        }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            console.log('DELETE: This bookname does not exist!');
        } else {
            console.log(result)
        }
    })
});

router.post('/edit/:bookname', (req, res) => {
    oldBookName = req.params.bookname;
    bookName = req.body.bookName;
    pageCount = req.body.pageCount;
    bookModel.findOneAndUpdate({
        name: oldBookName
    }, {
        $set: {
            name: bookName,
            pageCount: pageCount
        }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            console.log('EDIT: This bookname does not exist!');
        } else {
            console.log(result)
        }
    })
});

router.post('/revert/:bookname', (req, res) => {
    bookName = req.params.bookname;
    bookModel.findOneAndUpdate({
        name: bookName
    }, {
        $set: {
            isDeleted: false
        }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            console.log('REVERT: This bookname does not exist!');
        } else {
            console.log(result)
        }
    });
});


module.exports = router;