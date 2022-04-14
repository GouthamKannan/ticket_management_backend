/**
 * API Endpoints for handling project related api
 */

const router = require('express').Router();
const ProjectController = require('../controller/project');


/**
* API endpoint to create a project
*/
router.route('/create').post(async(req, res) => {
    try{
        const {name} = req.body;
        const response = await ProjectController.create_project(name)
        return res.status(200).json({
            success: true,
            data: "Project created successfully",
        });

    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in creating project :: ${error.message}`,
      });
    }
});

/**
* API endpoint to get all project details from database
*/
router.route('/').get(async(req, res) => {
    try{
        const response = await ProjectController.get_projects()
        return res.status(200).json({
            success: true,
            data: response,
        });

    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in fetching data :: ${error.message}`,
      });
    }
});

/**
* API endpoint to delete project
*/
router.route('/:id').delete(async(req, res) => {

    try {
        await ProjectController.delete_project(req.params.id)
        return res.status(200).json({
            success: true,
            data: "project deleted",
        });

    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in deleting project :: ${error.message}`,
      });
    }
});

module.exports = router;

