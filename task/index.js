// create categories of vitual lessons
// http://virtualdars.com/api/categories.

const Express = require('express');
const app = Express();
const {categories} = require('./categories');
const Joi = require('joi');

app.use(Express.json())

// get
app.get('/api/categories', (req, res) => {
    res.send(categories) 
});

// post
const categorySchema = Joi.object({
    topic: Joi.string().required().min(3),
    instructor: Joi.string().required(),
    duration: Joi.string().required(),
    level: Joi.string().required()
});

app.post('/api/categories', (req, res) => {
    
   const {error} = categorySchema.validate(req.body);
   if(error){
    res.status(400).send(error.details[0].message);
    return;
   }
    const category = {
            id: categories.length + 1,
            topic: req.body.topic,
            instructor: req.body.instructor,
            duration: req.body.duration,
            level: req.body.level
    };
    categories.push(category);
    res.status(201).send(category);
});

// // put
app.put('/api/categories/:id', (req, res) => {
    const category = categories.find(category => category.id === parseInt(req.params.id));
    if(!category){
        return res.status(404).send("No found the category for the id!")
    }

    category.topic = req.body.topic;
    category.instructor = req.body.instructor;
    category.duration = req.body.duration;
    category.level = req.body.level;
    res.send(category);

    res.send(categories[req.body.params])

})

// delete

app.delete('/api/categories/:id', (req, res) => {
    const  category = categories.find((category) => parseInt(req.params.id) === category.id);
    if(!category){
       return res.status(404).send('No found a category for the id!');
    }

    const indexCategory = categories.indexOf(category);
    categories.splice(indexCategory, 1);

    res.send(category);
})

const port = 8000;
app.listen(port, () => {
    console.log(`${port} - port is staring to listen `)
})

// {
//     "topic": "Web Design",
//     "instructor": "Javlonbek A.",
//     "duration": "10 hours",
//     "level": "Expert"
// }