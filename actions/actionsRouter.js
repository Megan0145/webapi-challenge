const express = require("express");
const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");
const router = express.Router();

router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
  const completed = req.body.completed ? req.body.completed : false;
  actions
    .insert({
      project_id: req.project.id,
      description: req.body.description,
      notes: req.body.notes,
      completed: completed
    })
    .then(action => {
      res.status(201).json({message: "Action created succesfully", action});
    })
    .catch(err => {
      res.status(500).json({
        message: `Something went terribly wrong trying to create the action for project with id of ${req.project.id}: ${err.message}`
      });
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  projects
    .getProjectActions(req.params.id)
    .then(actions => {
      if (actions.length) {
        res.status(200).json(actions);
      } else {
        res
          .status(200)
          .json({ message: "This project doesn't have any actions yet" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Something went terribly wrong trying to retrieve the actions for project with id of ${req.params.id}: ${err.message}`
      });
    });
});

router.get("/:id/actions/:action_id", validateProjectId, validateActionId, (req, res) => {
   res.status(200).json(req.action)
  });

router.put("/:id/actions/:action_id", validateProjectId, validateAction, (req, res) => {
    actions.update(req.params.action_id, req.body)
    .then(action => {
        res.status(200).json({message: "Updated successfully", action})
    })
    .catch(err => {
        res.status(500).json({message: `Something went terribly wrong trying to update the action with id of ${req.params.action_id} : ${err.message}`})
    })
})

router.delete("/:id/actions/:action_id", validateProjectId, validateActionId, (req, res) => {
    actions.remove(req.params.action_id)
    .then(() => {
        res.status(200).json({message: `Post deleted succesfully`, id: req.params.id})
    })
    .catch(err => {
        res.status(500).json({message: `Something went terribly wrong trying to delete the action with id of ${req.params.action_id} : ${err.message}`})
    })
})

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

function validateActionId(req, res, next) {
    actions.get(req.params.action_id)
    .then(action => {
        if(action){
            req.action = action;
            next()
        } else {
            res.status(404).json({message: "Action not found"})
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
}

module.exports = router;
