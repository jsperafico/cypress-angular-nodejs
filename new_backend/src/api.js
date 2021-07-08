const PORT = process.env.PORT || 3005;
const express = require('express');
const { version } = require('./common');
const app = new express();

app.use('/api', [express.json()]);
app.use(`/api/v${version}/tasks`, require('./tasks/endpoint'));
app.get('*', (req, res) => {
    res.send('<h1>Not Found1</h1>');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});