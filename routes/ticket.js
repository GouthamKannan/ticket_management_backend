/**
 * API endpoint to handle ticket api
 */

const router = require('express').Router();
const Ticketcontroller = require('../controller/ticket')

/**
* API endpoint to get ticket details from database
*/
router.get('/', async (req, res) => {
    try{
        const response = await Ticketcontroller.get_tickets()
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
* API endpoint to create a new ticket
*/
router.post('/create', async(req, res) => {
    try{
        const {title, description, projectName, assignee, priority, status, type} = req.body;
        const response = await Ticketcontroller.create_ticket(title, description, projectName, assignee, priority, status, type)
        return res.status(200).json({
            success: true,
            data: "ticket created successfully",
        });

    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in creating ticket :: ${error.message}`,
      });
    }
});

/**
* API endpoint to update a ticket
*/
router.post('/update/:id', async(req, res) => {
    console.log("I am here ", req.params.id)
    try{
        const id = req.params.id;
        const {title, description, projectName, assignee, priority, status, type} = req.body;
        const response = await Ticketcontroller.update_ticket(id, title, description, projectName, assignee, priority, status, type)
        return res.status(200).json({
            success: true,
            data: "ticket updated successfully",
        });

    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in updating ticket :: ${error.message}`,
      });
    }
});

/**
* API Endpoint to get a ticket from database
*/
router.get('/:id', async (req, res) => {
    console.log(req.params.id)

    try {
        const response = await Ticketcontroller.get_ticket(req.params.id)
        return res.status(200).json({
            success: true,
            data: response,
        });

    } catch (error) {
      // Error
      console.log(error.message)
      return res.status(500).json({
        success: false,
        data: `Error in fetching data :: ${error.message}`,
      });
    }
});

/**
* API endpoint to delete a ticket from the database
*/
router.delete('/:id', async (req, res) => {
    console.log("I am here ", req.params.id)

    try {
        await Ticketcontroller.delete_ticket(req.params.id)
        return res.status(200).json({
            success: true,
            data: "ticket deleted",
        });

    } catch (error) {
      // Error
      return res.status(500).json({
        success: false,
        data: `Error in deleting ticket :: ${error.message}`,
      });
    }
});

module.exports = router;