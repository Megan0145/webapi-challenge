const express = require("express");
const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");
const router = express.Router();

router.post("/:id", validateProjectId, validateAction, (req, res) => {
  const completed = req.body.completed ? req.body.completed : false;
  actions
    .insert({
      project_id: req.project.id,
      description: req.body.description,
      notes: req.body.notes,
      completed: completed
    })
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message: `Something went terribly wrong trying to create the action for project with id of ${req.project.id}: ${err.message}`
        });
    });
});

//middleware
function validateProjectId(req, res, next) {
  const { id } = req.params;
  projects
    .get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res
          .status(404)
          .json({ message: `Project with id of ${id} does not exist` });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Something went terribly wrong trying to retrieve project with id of ${id}: ${err.message}`
      });
    });
}

function validateAction(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "Please provide a request body" });
  } else if (!req.body.description) {
    res
      .status(400)
      .json({ message: "Please provide a description for your action" });
  } else if (!req.body.notes) {
    res.status(400).json({ message: "Please provide notes for your action" });
  } else {
    next();
  }
}

module.exports = router;
