const express = require('express');
const path = require('path');
const app = express();
const fallback = require('express-history-api-fallback');
const root = path.resolve(__dirname, '..', 'dist');

app.use(express.static(root));

app.use(fallback(path.resolve(root, 'index.html'), {root: root}));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(root, 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});