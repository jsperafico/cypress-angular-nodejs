describe('Feature: GetAll', () => {
    let {getAll} = require('../src/tasks/repository');
    let {TaskController} = require('../src/tasks/controller');
    jest.mock('../src/tasks/repository');

    test('should validate empty response', async () => {
        getAll.mockImplementation(() => { return []; })

        let result = await TaskController.getAll(jest.fn(), new Response());

        expect(result).toEqual([]);
    });

    test('should validate single entry in response', async () => {
        getAll.mockImplementation(() => { return [{
                text: "New Mocked Value 1",
                day: "New Mocked Value 1",
                reminder: false,
                id: 1
            }];
        });

        let result = await TaskController.getAll(jest.fn(), new Response());

        expect(result.length).toEqual(1);
    });

    test('should validate more than one entry in response', async () => {
        getAll.mockImplementation(() => { return [
            {
                text: "New Mocked Value 1",
                day: "New Mocked Value 1",
                reminder: false,
                id: 1
            },{
                text: "New Mocked Value 2",
                day: "New Mocked Value 2",
                reminder: false,
                id: 2
            },{
                text: "New Mocked Value 3",
                day: "New Mocked Value 3",
                reminder: true,
                id: 3
            }];
        });

        let result = await TaskController.getAll(jest.fn(), new Response());

        expect(result.length).toEqual(3);
    });
});

//=============================================================================//
//=============================================================================//

describe('Feature: GetEntry', () => {
    let {getEntry} = require('../src/tasks/repository');
    let {TaskController} = require('../src/tasks/controller');
    jest.mock('../src/tasks/repository');

    const request = {
        params: {
            id: 0
        }
    };

    test('should validate empty response', async () => {
        getEntry.mockImplementation(() => { return null; })

        request.params.id = -1;
        let result = await TaskController.getEntry(request, new Response());

        expect(result).toEqual({message: "Task not found", status: 404});
    });

    test('should validate single entry in response', async () => {
        let entry = {
            text: "New Mocked Value 1",
            day: "New Mocked Value 1",
            reminder: false,
            id: 1
        };
        getEntry.mockImplementation(() => { return entry; });

        request.params.id = 1;
        let result = await TaskController.getEntry(request, new Response());

        expect(result).toEqual(entry);
    });
});

//=============================================================================//
//=============================================================================//

describe('Feature: AddEntry', () => {
    let {addEntry, getEntry} = require('../src/tasks/repository');
    let {TaskController} = require('../src/tasks/controller');
    jest.mock('../src/tasks/repository');

    const request = {
        body: undefined
    };

    test('should not accept empty body', async () => {
        let result = await TaskController.addEntry(request, new Response());

        expect(result).toEqual({message: "Please provide an entry to be inserted.", status: 400});
    });

    test('should add an entry', async () => {
        let entry = {
            text: "This should be inserted",
            day: "This is a day",
            remember: true,
            id: 10
        };
        addEntry.mockImplementation(() => { return 1; });
        getEntry.mockImplementation(() => { return entry; });

        request.body = entry;
        let result = await TaskController.addEntry(request, new Response());

        expect(result).toEqual(entry);
    });

    test('should not add an entry', async () => {
        addEntry.mockImplementation(() => { return null; });

        request.body = {
            text: "This should be inserted",
            day: "This is a day",
            remember: true,
            id: 10
        };
        let result = await TaskController.addEntry(request, new Response());

        expect(result).toEqual({message: "Task was unable to be inserted.", status: 500});
    });
});

//=============================================================================//
//=============================================================================//

describe('Feature: DeleteEntry', () => {
    let {deleteEntry, getEntry} = require('../src/tasks/repository');
    let {TaskController} = require('../src/tasks/controller');
    jest.mock('../src/tasks/repository');

    const request = {
        params: {
            id: 0
        },
        body: undefined
    };

    test('should find an entry to delete', async () => {
        let entry  = {
            text: "This should be there",
            day: "This is a day",
            remember: true,
            id: 10
        };
        getEntry.mockImplementation(() => { return entry; });
        deleteEntry.mockImplementation(() => { return 1; });

        request.params.id = -1;
        
        let result = await TaskController.deleteEntry(request, new Response());

        expect(result).toEqual(entry);
    });

    test('should not find an entry to delete', async () => {
        getEntry.mockImplementation(() => { return null; });

        request.params.id = 1;
        
        let result = await TaskController.deleteEntry(request, new Response());

        expect(result).toEqual({message: "Task not found", status: 404});
    });

    test('should not delete an entry because found more than one', async () => {
        getEntry.mockImplementation(() => { return [
                {
                    text: "This should be there",
                    day: "This is a day",
                    remember: true,
                    id: 10
                },
                {
                    text: "This should be there",
                    day: "This is a day",
                    remember: true,
                    id: 11
                }
            ];
        });
        deleteEntry.mockImplementation(() => { return 0; });

        request.params.id = 1;
        
        let result = await TaskController.deleteEntry(request, new Response());

        expect(result).toEqual({message: "Task was unable to be deleted.", status: 500});
    });
});

//=============================================================================//
//=============================================================================//

describe('Feature: UpdateEntry', () => {
    let {updateEntry, getEntry} = require('../src/tasks/repository');
    let {TaskController} = require('../src/tasks/controller');
    jest.mock('../src/tasks/repository');

    const request = {
        params: {
            id: 0
        },
        body: undefined
    };

    test('should not find an entry to update', async () => {
        getEntry.mockImplementation(() => { return null; });

        request.params.id = 1;
        
        let result = await TaskController.updateEntry(request, new Response());

        expect(result).toEqual({message: "Task not found", status: 404});
    });

    test('should not find a reason to update', async () => {
        let entry = {
            text: "This should be there",
            day: "This is a day",
            remember: true,
            id: 10
        };
        getEntry.mockImplementation(() => { return entry; });

        request.params.id = 1;
        request.body = entry;
        
        let result = await TaskController.updateEntry(request, new Response());

        expect(result).toEqual({message: "No reason to update.", status: 409});
    });

    test('should update an entry', async () => {
        let foundEntry = {
            text: "This should be there",
            day: "This is a day",
            remember: true,
            id: 10
        };
        let modifyEntry = {
            text: "This should be there",
            day: "This is a day 1",
            remember: true,
            id: 10
        };
        getEntry
            .mockImplementationOnce(() => { return foundEntry; })
            .mockImplementationOnce(() => { return modifyEntry; });
        updateEntry.mockImplementation(() => { return 1; });

        request.params.id = 1;
        request.body = modifyEntry;
        
        let result = await TaskController.updateEntry(request, new Response());

        expect(result).toEqual(modifyEntry);
    });

    test('should not update an entry due internal database error', async () => {
        let foundEntry = {
            text: "This should be there",
            day: "This is a day",
            remember: true,
            id: 10
        };
        let modifyEntry = {
            text: "This should be there",
            day: "This is a day 1",
            remember: true,
            id: 10
        };
        getEntry.mockImplementation(() => { return foundEntry; });
        updateEntry.mockImplementation(() => { return 0; });

        request.params.id = 1;
        request.body = modifyEntry;
        
        let result = await TaskController.updateEntry(request, new Response());

        expect(result).toEqual({message: "Task was unable to be updated.", status: 500});
    });
});

class Response {
    status(value) { 
        this.status = value;
        return this;
    };
    send(value) { 
        this.message = value;
        return this;
    };
    json(value) { return value };
}