const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const books = [
    {id:1,name:'the men\'s search'},
    {id:2, name:'the war of art'},
];

// <------->
// app.post('/api/books', (req, res) => {

//        if(!req.body.name){
//     res.status(400).send('Name is required!');
//    }
//    if(req.body.name.length < 3){
//     res.status(400).send('Name should be at least 3 charcters');
//    }
   
//     const book = {
//         id: books.length + 1,
//         name: req.body.name
//     };
//     books.push(book);
//     res.status(201).send(book);
// });
// </-------->


// with joi validation
const bookScheme = Joi.object({
    name: Joi.string().required().min(3)
})

app.post('/api/books', (req, res) => {

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


const port = 8000;
app.listen(port, () =>{
    console.log(port + " portni eshitishini boshladim.")
} )