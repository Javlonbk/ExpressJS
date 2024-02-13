const express = require('express');
const app = express();
// const logger = require('./logger');
// const helmet = require('helmet');
// const morgan = require('morgan');
const Joi = require('joi');



// Middleware function
// app.use(logger); 
// app.use(helmet());
// app.use(morgan('tiny')
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const books = [
    {id:1,name:'the men\'s search'},
    {id:2, name:'the war of art'}
];

app.get('/', (req, res) => {
    res.send(books);
});

const bookScheme = Joi.object({
    name: Joi.string().required().min(3)
})

app.post('/', (req, res) => {

   const {error} = bookScheme.validate(req.body);
   if(error){
    res.status(400).send(error.details[0].message);
    return;
   }

 const book = {
     id: books.length + 1,
     name: req.body.name
 };
 books.push(book);
 res.status(201).send(book);
});



const port = process.env.PORT || 5000;
app.listen(port , () => {
    console.log(`${port} chi portni eshitishni boshladim...`);
})