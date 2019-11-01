const express = require('express')
const projects = require('../data/helpers/projectModel')
const router = express.Router();

router.get('/', (req, res) => {
    projects.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(
        err => {
            res.status(500).json({message: "Something went terribly wrong trying to retrieve all projects: " + err.message})
        }
    )
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

//middleware
function validateProjectId(req, res, next){
    const { id } = req.params;
    projects.get(id)
    .then(project => {
        if(project){
            req.project = project;
            next();
        } else {
            res.status(404).json({message: `Project with id of ${id} does not exist`})
        }
    })
    .catch(err => {
        res.status(500).json({message: `Something went terribly wrong trying to retrieve project with id of ${id}: ${err.message}`})
    })
}

module.exports = router;