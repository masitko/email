
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var GifSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Name cannot be blank'
    },
    type: {
        type: String,
        enum: {
            values: ['counter', 'sentence'],
            message: 'wrong type given!'
        }
    },
    colour1: {
        type: String
    },
    colour2: {
        type: String
    },
    backgroundColour: {
        type: String
    },
    repeat: {
        type: Number,
        default: 0
    },
    delay: {
        type: Number,
        default: 500
    },
    quality: {
        type: Number,
        default: 10
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    options: {
        type: Schema.Types.Mixed
    }
});

mongoose.model('Gif', GifSchema);