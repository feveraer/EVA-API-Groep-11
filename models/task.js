// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var taskSchema = new mongoose.Schema({
    dueDate: Date,
    completed: Date,
    challenge: { type: Schema.Types.ObjectId, ref: 'Challenge'}
});

// Return model
module.exports = restful.model('Task', taskSchema);