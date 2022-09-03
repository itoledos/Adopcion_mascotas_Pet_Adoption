const {Pet} = require("../models/pet.model")



module.exports.createPet = (req,res) => {
  const { name, type, description, skillOne, skillTwo, skillThree} = req.body;

  // ACTUALIZAR ESTOS CAMPOS !!!!!!!!!!!
  // mongoose viene con la función create
  Pet.create({
    name: name,
    type: type,
    description: description,
    skillOne: skillOne,
    skillTwo: skillTwo,
    skillThree: skillThree
  })
  .then(pet=>res.json(pet))
  .catch(err=>res.json(err))

  // dentro de res.json, si creamos un objeto directamente, debe
  // llevar el formato de {name: name, age:age, etc}

}

module.exports.getAllPets = (req,res) => {
  Pet.find()
    .then(all=>res.json({all}))
    .catch(err=>res.json(err))

  // dentro de res.json, si creamos un objeto directamente, debe
  // llevar el formato de {name: name, age:age, etc}

}

module.exports.getPets = (req,res) => {
  Pet.findOne({_id:req.params.id})
  .then(qry=>res.json({'justOne': qry}))
  .catch(err=>res.json(err))
}

module.exports.updatePets = (req,res) => {
  Pet.findOneAndUpdate({_id:req.params.id},
    req.body, {new: true, runValidators: true})
  .then(upd=>res.json(upd))
  .catch(err=>res.json(err))
}

module.exports.deletePets = (req,res) => {
  Pet.deleteOne({_id:req.params.id})
  .then(delConfirm=>res.json(delConfirm))
  .catch(err=>res.json(err))
}