const PetController = require('../controllers/pet.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app => {
    
    app.get("/api/pets/all", authenticate , PetController.getAllPets);
    app.get("/api/pets/:id", authenticate , PetController.getPets);
    app.post("/api/pets/new", authenticate , PetController.createPet);
    app.put('/api/pets/:id', authenticate , PetController.updatePets);
    app.delete('/api/pets/:id', authenticate , PetController.deletePets);

  };