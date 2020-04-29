// Good practice to have everything this is related to express in one file -
// And everything that is related to the server in another main file
// This will now be the starting file where everything starts, where we listen to the server.

const app = require('./app');

// START SERVER

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});