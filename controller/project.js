/**
 * Controller for handling projects in the database
 */

const mongodb = require("mongodb");
const { client: mongoClient } = require("../model/mongodb");

// Connect to MongoDB database
const dbConnection = mongoClient.db("TicketManagement");

// Initialize the collections for the database
const ProjectCollection = dbConnection.collection("project_details");

/**
 * Create a new record for project
 * @param {string} name : project name
 * @returns ID of inserted record
 */
const create_project = async(name) => {
    const response = await ProjectCollection.insertOne({
        name
    });
    return response;
}

/**
 * Get all projects from the database
 * @returns array of projects
 */
const get_projects = async() => {
    const response = await ProjectCollection.find({}).toArray();
    return response;
}

/**
 * Delete a project from database
 * @param {string} id : ID of the project to delete
 * @returns null
 */
const delete_project = async(id) => {
    const response = await ProjectCollection.deleteOne(
        {_id : new mongodb.ObjectId(id)}
    )
}

// Export functions
module.exports = {
    create_project,
    get_projects,
    delete_project
}