const Express = require('express');
const app = Express();


const books = [
    {id:1,name:'the men\'s search'},
    {id:2, name:'the war of art'}
];

app.delete('/api/books/:id', (req, res) => {
    // search book according to id. if it isn't found, return 404 
    const  book = books.find((book) => parseInt(req.params.id) === book.id);
    if(!book){
       return res.status(404).send('No found a book for the id!');
    }
    // delete the book 
    const indexBook = books.indexOf(book);
    books.splice(indexBook, 1);
    // return the found book
    res.send(book);
})

app.get('/api/books', (req, res) => {
    res.send(books);
})

const port = 4000; 
app.listen(port, () => {
    console.log(`${port} - start to listen...`);
})

