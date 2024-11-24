


// const mongoose = require('mongoose');

// const todoSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['Pending', 'In Progress', 'Completed'],
//         default: 'Pending'
//     }
// }, { timestamps: true });

// module.exports = mongoose.model('Todo', todoSchema);
// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    userId: { // New field to associate the note with the user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
