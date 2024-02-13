const express = require("express");
const app = express();
const morgan = require('morgan');
const config = require('config')


app.use(morgan('tiny'));
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', {title: 'my express app', greeting: 'Assalomu alaykum!'})
})


if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('logger...')
}

console.log(config.get('name'));
console.log(config.get('mailserver.host'));
// console.log(config.get('mailserver.password'));// code doesn't work
// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));


// $env:NODE_ENV="production" to change


const port = 5000;
app.listen(port, () => {console.log(`${port} stating to liste...`);})