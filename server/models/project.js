const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectname: {
    type: String,
    required: true,
  },
  issues: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'issue'}]
  }
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;