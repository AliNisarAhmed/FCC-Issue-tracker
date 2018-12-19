const router = require('express').Router();
const Project = require('../models/project');
const Issue = require('../models/issue');

router.get('/:project', async (req, res) => {
  const projectname = req.params.project;
  let project = await Project.findOne({projectname}).exec();
  let issues = await Issue.find({ project: project._id, ...req.query }).exec();
  res.json(issues);
})

router.post('/:project', async (req, res) => {
  try {
    const projectname = req.params.project;
    const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
    let project = await Project.findOne({projectname}).exec();

    if (project) {
      const issue = await Issue.create({
        issue_title, issue_text, created_by, assigned_to, status_text, project: project._id
      });
      await Project.findByIdAndUpdate(project._id, {$push: {issues: issue} })
      res.json(issue);

    } else {

      let newProject = await Project.create({projectname});
      const issue = await Issue.create({
        issue_title, issue_text, created_by, assigned_to, status_text, project: newProject._id
      });
      await Project.findByIdAndUpdate(newProject._id, {$push: {issues: issue} })
      res.json(issue);
    }
  } catch (error) {
    // console.log(error.message);
    res.status(400).json({error: error.message});
  }
})

router.put('/:project', async (req, res) => {
  const project = req.params.project;
  // console.log(req.body);
  const id = req.body._id;
  const { issue_title, issue_text, assigned_to, status_text, open } = req.body;
  if (!(issue_title || issue_text || assigned_to || status_text || open)) {
    res.status(400).json({failed: 'no update field sent'});
  }
  let updates = Object.assign({}, req.body, {udpated_on: Date.now()})
  try {
    let issue = await Issue.findByIdAndUpdate(id, updates, {new: true});
    if (issue) {
      res.status(200).json(issue);
    } else {
      res.status(400).json({failed: 'could not update'});
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.delete('/:project', async (req, res) => {
  const projectname = req.params.project;
  const id = req.body._id;
  // console.log(id);
  if (!id) {
    res.status(400).json({error: '_id error'});
  }
  try {
    let issue = await Issue.findByIdAndDelete(id).exec();
    // console.log(issue);
    if (issue) {
      await Project.findByIdAndUpdate(issue.project, {$pull: {issues: issue._id}})
      res.status(200).json({success: `deleted ${id}`});
    } else {
      // console.log('error');
      res.status(400).json({failed: `could not delete ${id}`});
    }
  } catch (error) {
    // console.log('error');
    res.status(500).json({error: error.message});
  }
});

router.get('/:project/:issue_id', async (req, res) => {
  try {
    let issue_id = req.params.issue_id;
    let issue = await Issue.findById(issue_id);
    res.json(issue)  
  } catch (error) {
    res.json({error: error.message});
  }
})

module.exports = router;