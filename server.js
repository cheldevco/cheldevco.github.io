const express = require('express');
const multer = require('multer');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Настройка хранилища для загруженных файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Настройка сессий
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('uploads'));
app.use(express.static('public'));

// Пользователи (логин: admin, пароль: admin)
const users = {
    admin: 'admin' // Логин: admin, Пароль: admin
};

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Страница входа
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

// Обработка входа
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        req.session.user = username;
        res.redirect('/admin');
    } else {
        res.send('Неверный логин или пароль');
    }
});

// Панель администратора
app.get('/admin', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, 'public/admin.html'));
});

// Обработка загрузки файлов
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.session.user) {
        return res.status(403).send('Доступ запрещен');
    }
    res.send('Файл загружен: ' + req.file.originalname);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
