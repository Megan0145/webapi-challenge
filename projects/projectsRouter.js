const express = require("express");
const projects = require("../data/helpers/projectModel");
const router = express.Router();

router.get("/", (req, res) => {
  projects
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Something went terribly wrong trying to retrieve all projects: " +
          err.message
      });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", validateProject, (req, res) => {
  const completed = req.body.completed ? req.body.completed : false
  projects
    .insert({name: req.body.name, description: req.body.description, completed: completed})
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Something went terribly wrong trying to create new project: " +
          err.message
      });
    });
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  projects
    .update(req.project.id, req.body)
    .then(project => {
      res
        .status(200)
        .json({ message: "Updated successfully", project: project });
    })
    .catch(err => {
      res.status(500).json({
        message: `Something went terribly wrong trying to update project with id of ${req.project.id}: ${err.message}`
      });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  projects
    .remove(req.project.id)
    .then(() => {
      res.status(200).json({ message: "Post deleted", id: req.project.id });
    })
    .catch(err => {
      res.status(500).json({
        message: `Something went terribly wrong trying to delete the post with the id of ${req.project.id}: ${err.message}`
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

function validateProject(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "Please provide a request body" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "Please provide a name for your project" });
  } else if (!req.body.description) {
    res
      .status(400)
      .json({ message: "Please provide a description for your project" });
  } else {
    next();
  }
}

module.exports = router;
