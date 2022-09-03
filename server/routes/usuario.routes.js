const UsuarioController = require('../controllers/usuario.controller');

module.exports = (app) => {
    // Ruta puede cambiar de nombre según estructura del proyecto
    // Acá coincide con el post de la otra ruta
    app.post("/api/pets/usuario", UsuarioController.registrar);
    app.post('/api/pets/login', UsuarioController.login);
}