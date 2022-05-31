const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Led = new Schema({
    id: {
        type: 'Number',
        required: true,
        unique: true,
    },
    name: {
        type: 'String',
        required: true
    },
    status: {
        type: 'Boolean',
        required: true,
    }
})

module.exports = mongoose.model('Led', Led);