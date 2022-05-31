const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Log = new Schema({
    deviceName: {
        type: 'String',
        required: true
    },
    sensor: {
        type: 'String',
        required: true,
    },
    value: {
        type: 'Number',
        required: true
    },
    date: {
        type: 'Date',
        required: true
    },
    deviceId: {
        type: 'Number',
        required: true
    },
    ipAddress: {
        type: 'String',
        required: true
    }
})

module.exports = mongoose.model('Log', Log);