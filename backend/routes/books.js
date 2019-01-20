const { Router } = require('express');
const router = Router();

const path = require('path');
const { unlink } = require('fs-extra');

const Book = require('../models/Book');

router.get('/', async (req, res) => {
    const books = await Book.find().sort('-_id');
    res.json(books);
});

router.post('/', async (req, res) => {
    const { title, author, isbn } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({title, author, isbn, imagePath});
    console.log(newBook)
    await newBook.save();
    res.json({'message': 'Book Saved'});
});

router.delete('/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    await unlink(path.resolve('./backend/public/' + book.imagePath));
    res.json({message: 'Book Deleted'});
});


module.exports = router;