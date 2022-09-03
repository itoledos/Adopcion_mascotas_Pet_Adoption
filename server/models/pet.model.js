const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {type: String,
        required: [true, 'Pet name is required'],
        minLength: [3, 'Pet name must be equal or greater than 3 characters']
        },
    type: {type: String,
        required: [true, 'Pet type is required'],
        minLength: [3, 'Pet type must be equal or greater than 3 characters']
        },
    description: {type: String,
        required: [true, 'Description is required'],
        minLength: [3, 'Description must be equal or greater than 3 characters']
        },
    skillOne: {type: String,
        required: false
        },
    skillTwo: {type: String,
        required: false
        },
    skillThree: {type: String,
        required: false
        }
}, {timestamps: true});

module.exports.Pet = mongoose.model("Pet", PetSchema);


