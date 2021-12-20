
// импортируем модуль эксперсс 
const express = require('express'); 
const bodyParser = require('body-parser');
const wetherRequest = require('./requests/wheather.request');

//переменная запускающая все приложение , результатом будет работа expree
const app = express();

//по умолчанию ставим отображение через шаблонизатор ejs
app.set('view engine', 'ejs');
//прописываем путь к статическим файлам
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

// get запрос с функцией колбэк
app.get("/", (req ,res) => {
    res.render('index', {wheather: null, error: null}); 
});


app.post('/', async (req, res) => {
    const { city } = req.body; 

    const {wheather, error} = await wetherRequest(city); 

    res.render('index', {wheather, error});
});

//подключаем опереленный порт у функции app черещ метод listen
app.listen(3000, () => {
    console.log('Server has started on port 3000...');
});