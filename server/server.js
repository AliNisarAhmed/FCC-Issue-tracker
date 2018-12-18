const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./connect');
const apiRouter = require('./routes/api');

const Project = require('./models/project');
const Issue = require('./models/issue');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/issues', apiRouter);

app.use(express.static('dist'));

app.get('/projects', async (req, res) => {
  let projects = await Project.find({}).exec();
  res.json(projects);
});

app.post('/projects/new', async (req, res) => {
  let project = await Project.create({
    projectname: req.body.projectname
  })
  res.json(project);
})

connect('mongodb://localhost:27017/issues')
  .then(() => {
    app.listen(PORT, () => console.log('Listening on port 3000!'))
  })