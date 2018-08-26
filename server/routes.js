var express = require('express');
var router = express.Router();

var path = require('path');

var bookModel = require('./models/bookSchema');

// GET requests
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/html/index.html'))
});

router.get('/bookShow', (req, res) => {
    // TODO: sort!
    bookModel.find({
        isDeleted: false
    }).sort('-createdAt').exec((err, data) => {
        if (data) {
            res.send(data);
        }
    });
});

router.get('/deletedBooks', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/html/deletedBooks.html'));
});

router.get('/deletedBookList', (req, res) => {
    bookModel.find({isDeleted: true}, (err, data) => {
        if (data) {
            res.send(data);
        }
    })
})

router.get('/bookPage', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/html/bookShow.html'))
});

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
            res.redirect('/bookShow')
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
    // oldBookName = req.params.bookname;
    // bookName = req.body.bookName;
    // pageCount = req.body.pageCount;
    // bookModel.findOneAndUpdate({
    //     name: oldBookName
    // }, {
    //     $set: {
    //         name: bookName,
    //         pageCount: pageCount
    //     }
    // }, {
    //     new: true
    // }, (err, result) => {
    //     if (err) {
    //         console.log('EDIT: This bookname does not exist!');
    //     } else {
    //         console.log(result)
    //     }
    // })
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