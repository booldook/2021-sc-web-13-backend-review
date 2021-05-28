const express = require('express');
const app = express();
require('./modules/server-init')(app, 5000)
const path = require('path');
const moment = require('moment');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.locals.pretty = true;

const gallery = [
	{id: 1, src: 'evt01.jpg', title: '좋은그림1'},
	{id: 2, src: 'evt02.jpg', title: '좋은그림2'},
	{id: 3, src: 'evt03.jpg', title: '좋은그림3'},
	{id: 4, src: 'evt04.jpg', title: '좋은그림4'},
	{id: 5, src: 'evt05.jpg', title: '좋은그림5'},
	{id: 6, src: 'evt06.jpg', title: '좋은그림6'},
	{id: 7, src: 'evt07.jpg', title: '좋은그림7'},
	{id: 8, src: 'evt08.jpg', title: '좋은그림8'},
];

const gbook = [
	{ id: 1, content: '임시', createdAt: '2021-05-28 14:43:22' }
]

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, './public')));

app.get('/gallery', (req, res, next) => {
	res.render('gallery/gallery.ejs', { gallery, pageTitle: '갤러리리스트' });
});

app.get('/gbook', (req, res, next) => {
	res.render('gbook/gbook.ejs', { pageTitle: '방명록', gbook });
});

app.post('/gbook/save', (req, res, next) => {
	let { content } =  req.body;
	let id = gbook[0].id + 1;
	let createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
	gbook.unshift({ id, content, createdAt });
	res.redirect('/gbook')
});
