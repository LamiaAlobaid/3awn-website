const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public', 'CS346 project')));

app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, 'public', 'CS346 project', 'pageNotFound.html'));
});

app.listen(3000, () => {
    console.log("App is listening on port 3000")
})

