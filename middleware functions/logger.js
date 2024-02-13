function logger(req, res, next) {
    console.log('starting Logger ...');
    next();
}

module.exports = logger