var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var products = require('./shop/index.js')
var tours = require('./tours')
var media = require('./media')
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

mongoClient.connect(function (err, client) {
    const db = client.db("kurscit");
    let col = db.collection("products");
    if (err) return 0;
    app.locals.products = col;
    col = db.collection("media");
    app.locals.media = col;
    col = db.collection("tour");
    app.locals.tour = col;
    process.on("SIGINT", () => {
        client.close();
        process.exit();
    })
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS, PATCH");
    next();
});
app.use(express.static(__dirname + '/images')) // в __dirname хранится абсолютный путь к файлу, тк мы находимся в корне проекта, а не в папке сервера 
// app.use('/uploads', express.static('uploads'))

app.use("/products", products);
app.use("/tours", tours);
app.use("/media", media);

app.listen(8080, () => {
    console.log("server is start magic on ", 8080)
})
