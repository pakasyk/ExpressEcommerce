//fs - naudosime failu skaitimui ir rasymui;
var fs = require("fs");
//naudosim express biblioteka
var express = require('express');
//issikvieciame funkcija is bibliotekos express();
var app = express();
var port = 3000;




//nustatome jog naudosime .ejs, o ne .html musu aplikacijoje;
app.set('view engine', 'ejs');

//leidziame applikacijai rodyti failus esancius public folderyje;
app.use(express.static('public'));

//serverio paleidimas
app.listen(port, function(){ console.log('Server is running on http://localhost:'+ port)});

//pradinis puslapis kuri vartotojui rodysime
app.get('/', (req, res) => {
    //perskaitau is duombazes produktus
    let productsFromDB = fs.readFileSync('./database/products.json');
    //juos is failo teksto paverciu i javascript Object arba Array
    let products = JSON.parse(productsFromDB);
    //siunciu index.ejs ir products array
    res.render('index', {products: products} );
});


app.get('/product/:id', (req, res) => {
    let id = req.params.id;

    let productsFromDB = fs.readFileSync('./database/products.json');
    let products = JSON.parse(productsFromDB);

    res.render( 'product', { product: products[id] } );

});

app.get('/cart', (req, res) => {
    res.render('cart');
})



