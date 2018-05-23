const express = require('express'),
    bodyParser = require('body-parser'),
    BooksSeries = require('./DAO/booksSeries'),
    Users = require('./DAO/users'),
    connection = require('./connection'),
    Validation = require('./validation'),
    validation = new Validation(),
    booksSeries = new BooksSeries(),
    users = new Users(),

    app = express(),
    port = process.env.PORT || 3000;

//app parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/public', express.static(`${__dirname}/def`));

//every response is json
app.use(
    (req,res,next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.set("Content-Type", "application/json");
        next();
    });

//parse user id from search urls (check if valid)
app.param('userId', (req, res, next, userId) => {
  users.checkUser(userId)
    .then(check => {
        if(check===true) {
            next();
        } else {
            res.json(check);
        }
    })
});

app.all('/', (req, res) => res.sendFile(`${__dirname}/public/`));

//every search urls needs userID
app.get('/allSerieses/:userId', (req, res) => {
    return booksSeries.allSerieses()
        .then(docs => res.json(docs));
});

app.post('/seriesByName/:userId', (req, res) => {
    const seriesName = req.body.seriesName;
    return booksSeries.seriesByName(seriesName)
        .then(docs => res.json(docs));
});

app.post('/seriesesByParamsGA/:userId', (req, res) => {
    const genre = req.body.genre, 
        author = req.body.author;
    return booksSeries.seriesesByParamsGA(genre,author)
        .then(docs => res.json(docs));
});

app.post('/seriesesByParamsAB/:userId', (req, res) => {
    const author = req.body.author, 
        bookName = req.body.bookName
    return booksSeries.seriesesByParamsAB(author, bookName)
        .then(docs => res.json(docs));
});

//redirect to main page if unreconized url
app.all('*', (req, res) => {
    res.redirect(`${__dirname}/public/`);
});

app.listen(port, () => console.log(`Server is listening on ${port}`));