// Good practice to have everything this is related to express in one file -
// And everything that is related to the server in another main file
// This will now be the starting file where everything starts, where we listen to the server.

const dotenv = require('dotenv');
dotenv.config({path: './config.env'}); // This will read the variables from the config file and save them as environment variables

const app = require('./app');

// console.log(process.env);

// START SERVER

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});