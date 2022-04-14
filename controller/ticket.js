/**
 * Controller for handling tickets in database
 */

const mongodb = require("mongodb");
const { client: mongoClient } = require("../model/mongodb");

// Connect to MongoDB database
const dbConnection = mongoClient.db("TicketManagement");

// Initialize the collections for the database
const TicketCollection = dbConnection.collection("ticket_details");

/**
 * Update a ticket in database
 * @param {string} id : Ticket ID
 * @param {string} title : Ticket title
 * @param {string} description : Ticket description
 * @param {string} projectName : Name of the Ticket
 * @param {string} assignee : The user to whom the ticket is assigned
 * @param {string} priority : Priority of the ticket
 * @param {string} status : Status of the ticket
 * @param {string} type : Ticket type
 * @returns ID of the inserted document
 */
const update_ticket = async(id, title, description, projectName, assignee, priority, status, type) => {
    const response = await TicketCollection.updateOne(
        {_id : new mongodb.ObjectId(id)},
        {$set : {title, description, projectName, assignee, priority, status, type}
    });
    return response;
}

/**
 * Create a new ticket in database
 * @param {string} id : Ticket ID
 * @param {string} title : Ticket title
 * @param {string} description : Ticket description
 * @param {string} projectName : Name of the Ticket
 * @param {string} assignee : The user to whom the ticket is assigned
 * @param {string} priority : Priority of the ticket
 * @param {string} status : Status of the ticket
 * @param {string} type : Ticket type
 * @returns ID of the inserted document
 */
const create_ticket = async(title, description, projectName, assignee, priority, status, type) => {
    const response = await TicketCollection.insertOne({
        title, description, projectName, assignee, priority, status, type
    });
    return response;
}

/**
 * Get array of tickets from the database
 * @returns Array of ticket
 */
const get_tickets = async() => {
    const response = await TicketCollection.find({}).toArray();
    return response;
}

/**
 * Get the ticket details of the given ticket ID
 * @param {string} id : Ticket ID
 * @returns : Object containing the ticket details
 */
const get_ticket = async(id) => {
    const response = await TicketCollection.findOne(
        {_id : new mongodb.ObjectId(id)}
    );
    return response;
}

/**
 * Delete the ticket of the given ticket ID
 * @param {string} id : Ticket ID
 * @returns : null
 */
const delete_ticket = async(id) => {
    console.log(id)
    const response = await TicketCollection.deleteOne(
        {_id : new mongodb.ObjectId(id)}
    )
}

// Export functions
module.exports = {
    update_ticket,
    create_ticket,
    get_ticket,
    get_tickets,
    delete_ticket
}