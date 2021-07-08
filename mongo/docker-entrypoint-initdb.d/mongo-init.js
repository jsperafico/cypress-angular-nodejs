db.createUser({
    user: 'application_user',
    pwd: 'application_password',
    roles: [
        {role: 'readWrite', db: 'Example'}
    ]
});
db.getSiblingDB('Example');
db.createCollection('tasks', {
    autoIndexId: true
});