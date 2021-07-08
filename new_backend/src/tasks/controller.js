const {getAll, getEntry, addEntry, deleteEntry, updateEntry} = require('./repository');

class Controller {
    async getAll(req, res) {
        let result = await getAll();
        return res.json(result);
    }
    
    async getEntry(req, res) {
        let response = await getEntry(req.params.id);
        if (response == null) {
            return res.status(404).send('Task not found');
        }
        return res.json(response);
    }
    
    async addEntry(req, res) {
        if (req.body === undefined) {
            return res.status(400).send('Please provide an entry to be inserted.');
        }
    
        let result = await addEntry(req.body);
        if (result !== undefined && result != null) {
            return res.json(await getEntry(result));
        }
        return res.status(500).send('Task was unable to be inserted.');
    }
    
    async deleteEntry(req, res) {
        let response = await getEntry(req.params.id);
        if (response == null) {
            return res.status(404).send('Task not found');
        }

        let deleted = await deleteEntry(req.params.id);
        if (deleted == 1) {
            return res.json(response);
        }
        return res.status(500).send('Task was unable to be deleted.');
    }
    
    async updateEntry(req, res) {
        let response = await getEntry(req.params.id);
        if (response == null) {
            return res.status(404).send('Task not found');
        }
        if ((response.text == req.body.text) && (response.day == req.body.day) && (response.reminder == req.body.reminder)) {
            return res.status(409).send('No reason to update.');
        }
    
        let updated = await updateEntry(req.params.id, req.body);
        if (updated == 1) { 
            return res.json(await getEntry(req.params.id));
        }
        return res.status(500).send('Task was unable to be updated.');
    }
}
const TaskController = new Controller();

module.exports = {TaskController};