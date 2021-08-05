# Comandos abreviados npm

```
npm i -> npm install --save [nombrePaquete]
npm i -D -> npm install --save-dev
npm rm -> npm remove [nombrePaquete]
``` 

# Como crear un proyecto de NPM
1. `git init` (opcional)
2. (si tienes repositorio de git) crear `.gitignore` y añadir node_modules
3. `npm init`
[NOTA]: Si el proyecto ya tiene un `package.json`, tendremos que hacer `npm i` para instalar los paquetes. Se nos instalarán todos los paquetes.
4. `npm i express`
5. Crear el código básico de nuestro servidor
```js
const express = require('express');

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
    console.log(`Servidor functionando en http://localhost:${PORT}`);
});
```
6. Script "start" en package.json
7. Instalar Nodemon. Desde la consola `npm i nodemon`
8. Añadir el script dev en el `package.json` añadiendo dentro de "scripts" `"dev": "nodemon ./index.js"`.
```json
    "scripts": {
        "start": "node ./index.js",
        "dev": "nodemon ./index.js"
    },
```

9. Crear rutas
```js
const app = express();

const router = express.Router();

router.get('/', (req, res) => {
    return res.send('Hola clase!!');
});

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
```
10. Conectar con base de datos. Para ello creamos el archivo `db.js`.
Hay qu einstalar mongoose: `npm i mongoose`.
```js
const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/junio-node-session-3';

const connect = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log('Conectado correctamente a la DB');
    } catch (error) {
        console.log(`Ha ocurrido un error conectando a la base de datos ${error}`);
    }
};

module.exports = { DB_URL, connect };
```

Y en el archivo `index.js`, requerimos y conectamos con la función que hemos creado en `db.js`.

```js
const db = require('./db.js');
db.connect();
```

11. Empezamos creando el Schema de mongoose

12. Una ves que tenemos el esquema creado, podemos crear de manera opcional un `seed`.
¿Que es esto del seed?
Un seed o semilla, sirve para introducir en nuestra base de datos, unos datos por defecto.

13. 