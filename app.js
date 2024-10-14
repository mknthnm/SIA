const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const books = [
    {
        "id":1,
        "title":"Hyouka: Classics Literature Club",
        "author":"Honobu Yonezawa",
        "price":"750.00",
        "published":"2007",
        "stock":"120"
    },
    {
        "id":2,
        "title":"The Shot-Down West",
        "author":"BlackheartAssassin",
        "price":"900.00",
        "published":"2018",
        "stock":"40"
    },

];

app.get('/api/books', (_req, res) => {
    res.json(books);
});

app.post('/api/books', (req, res) => {
    const addBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        published: req.body.published,
        stock: req.body.stock
    };
    books.push(addBook);
    res.json(addBook);
});

app.put('/api/books/:id', (req, res) =>{
    const id = req.params.id;
    const book = books.find(book => book.id === parseInt(id));
    if(!book) {
        return res.status(404).json({message: 'Book not found.'});
    }
    const updatedBook = {
        id: book.id,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        published: req.body.published,
        stock: req.body.stock
    };
    const index = books.indexOf(book);
    books.splice(index, 1, updatedBook);
    res.json(updatedBook);
});

app.delete('/api/books/:id', (req, res) => {
    const id = req.params.id;

    for(let i = 0; i < books.length; i++) {
        if(books[i].id === parseInt(id)) {
            books.splice(i, 1);
            res.json({message: 'Book deleted.'});
            return;
        }
    }
    res.status(404).json({message: 'Book not found.'});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});