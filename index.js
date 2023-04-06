const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

//USANDO O EXPRESS
const app = express()

//CONFIGS DO HANDLEBARS E EXPRESS
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const handlebars = exphbs.create({ extname: '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.use(express.static('public'))


//ROTAS DE GET
app.get('/', function (req, res) {
    res.render('home')
})

//pegando todos os livros
app.get('/books', (req, res) => {
    const query = `SELECT * FROM books`

    conn.query(query, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        const books = data
        console.log(books);

        res.render('books', { books })


    })
})
app.get('/books/:id', (req, res) => {

    const { id } = req.params

    const query = `SELECT * FROM books WHERE id = ${id}`

    conn.query(query, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]//so retorna o primeiro indice do array
        console.log(book);

        res.render('book', { book })


    })
})






//ROTAS DE EDIÇÃO 
app.get('/books/edit/:id', (req, res) => {

    const { id } = req.params

    const query = `SELECT * FROM books WHERE id = ${id}`

    conn.query(query, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        const book = data[0]//so retorna o primeiro indice do array
        console.log(book);

        res.render('editbook', { book })


    })
})
app.post('/books/updatebook', (req, res) => {

    const { title, pageqty, id } = req.body

    const query = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`

    conn.query(query, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        res.redirect('/books')


    })
})





















//ROTAS DE POST
app.post('/books/insertbook', function (req, res) {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`

    conn.query(query, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/books')
    })
})






//ROTAS PRA DELETE
app.post('/books/remove/:id', (req, res) => {

    const { id } = req.params

    const query = `DELETE FROM books WHERE id = ${id}`

    conn.query(query, (err) =>{
        if (err){
            console.log(err);
            return;
        }
        res.redirect('/books')
    })

})













//CONEXÃO COM O BANCO (UNIVERSAL PRA SQL)
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nodemysql2',
})
conn.connect(function (err) {
    if (err) {
        console.log(err)
    }

    console.log('Conectado ao MySQL!')

    app.listen(3000)
})