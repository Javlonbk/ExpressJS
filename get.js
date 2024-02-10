const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello');
})

const books = [
    {id:1,name:'the men\'s search'},
    {id:2, name:'the war of art'}
]

app.get('/api/books', (req, res) => {
    res.send(books);
})

app.get('/api/books/:id', (req, res) => {
    const  book = books.find(book => book.id === parseInt(req.params.id));

    if(!book)
        res.status(404).send('Berilgan idea bo\'yicha kitob topilmadi.');
        res.send(book);

})

// app.get('api/articles/:year/:month', (req, res) => {
//     res.send(req.query)
// })


const port = process.env.PORT || 5000;
app.listen(port , () => {
    console.log(`${port} chi portni eshitishni boshladim...`);
})