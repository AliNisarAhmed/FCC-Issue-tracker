const router = require('express').Router();
const Project = require('../models/project');
const Issue = require('../models/issue');

router.get('/:project', async (req, res) => {
  const projectname = req.params.project;
  let projects = await Project.findOne({projectname}).populate('issues').exec();
  res.json(projects);
})

router.post('/:project', async (req, res) => {
  try {
    const projectname = req.params.project;
    const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
    console.log(projectname);
    console.log(req.body);
    let project = await Project.findOne({projectname}).exec();
    if (project) {
      console.log('project found')
      console.log(project);
      console.log(project.issues);
      const issue = await Issue.create({
        issue_title, issue_text, created_by, assigned_to, status_text, project: project._id
      });
      await Project.findByIdAndUpdate(project._id, {$push: {issues: issue} })
      res.json(issue);
    } else {
      let newProject = await Project.create({projectname});
      console.log('new project created');
      console.log(newProject);
      console.log(newProject.issues);
      const issue = await Issue.create({
        issue_title, issue_text, created_by, assigned_to, status_text, project: newProject._id
      });
      await Project.findByIdAndUpdate(newProject._id, {$push: {issues: issue} })
      res.json(issue);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.put('/:project', async (req, res) => {
  const project = req.params.project;
  console.log(req.body);
  const id = req.body._id;
  const { issue_title, issue_text, assigned_to, status_text, open } = req.body;
  if (!(issue_title || issue_text || assigned_to || status_text || open)) {
    res.json({failed: 'no update field sent'});
  }
  let updates = Object.assign({}, req.body, {udpated_on: Date.now()})
  try {
    let issue = await Issue.findByIdAndUpdate(id, updates, {new: true});
    if (issue) {
      res.json(issue);
    } else {
      res.json({failed: 'could not update'});
    }
  } catch (error) {
    res.json({error: error.message});
  }

});

router.delete('/:project', async (req, res) => {
  const projectname = req.params.project;
  const id = req.body._id;
  console.log(id);
  if (!id) {
    res.status(422).json({error: '_id error'});
  }
  try {
    let issue = await Issue.findByIdAndDelete(id).exec();
    console.log(issue);
    if (issue) {
      await Project.findByIdAndUpdate(issue.project, {$pull: {issues: issue._id}})
      res.json({success: `deleted ${id}`});
    } else {
      res.json({failed: `could not delete ${id}`});
    }
  } catch (error) {
    res.json({error: error.message});
  }
});

// router.get('/:project/issues', async (req, res) => {
//   const project = req.params.project;
//   let projects = await Project.findOne({projectname: project}).populate('issues').exec();
//   res.json(projects);
// });

module.exports = router;