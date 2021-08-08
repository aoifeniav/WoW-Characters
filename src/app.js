const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authMiddleware = require('./middlewares/auth.middleware');

const rootRoutes = require('./routes/Root.routes');
const authRoutes = require('./routes/Auth.routes');
const charsRoutes = require('./routes/Char.routes');
const guildsRoutes = require('./routes/Guild.routes');

const db = require('./config/db.config');
const auth = require('./auth');
const hbs = require('./config/hbs.config');

db.connect();

const PORT = process.env.PORT || 3000;
const app = express();

// Cambia la petición de los formularios para habilitar los métodos PUT y DELETE.
app.use(methodOverride('_method'));

// Crea req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars.
hbs.hbsHelpers();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Configuración de la carpeta public (JS, estilos, imágenes).
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la autenticación.
auth.setStrategies();
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({mongoUrl: db.DB_URL}),
}));
app.use(passport.initialize());
app.use(passport.session());

// Gestión de rutas.
app.use('/', rootRoutes);
app.use('/auth', authRoutes);
app.use('/chars', authMiddleware.isAuth, charsRoutes);
app.use('/guild', authMiddleware.isAuth, guildsRoutes);
app.use('*', (req, res, next) => {
    const error = new Error('Rout not found.');
    return res.status(404).json(error.message);
})

// Manejador de errores.
app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.status || 500).json(error.message || "Undefined error.");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}.`);
});
