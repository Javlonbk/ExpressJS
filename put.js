const Express = require('express');
const app = Express();
const Joi = require('joi')
app.use(Express.json());

const books = [
    {id:1,name:'the men\'s search'},
    {id:2, name:'the war of art'}
]
app.put('/api/books/:id', (req, res) => {
    // search book according to id. if it isn't found, return 404 
    const  book = books.find(book => parseInt(req.params.id) === book.id);
    if(!book){
       return res.status(404).send('No found a book for the id!');
    }
    
    // if it is found, Validate the request
    const bookScheme = Joi.object({
        name: Joi.string().required().min(3)
    })
    const {error} = bookScheme.validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    // Update the book
    book.name =  req.body.name;
    res.send(book);

})





const port = 6000;
app.listen(port, () => {
    console.log(`${port} portni eshita boshladi.`);
})