const express = require("express");
const app = express.Router();
const db = require('./db');
const port = 8080;

app.listen(port, () => {
    console.log(`server is running in port ${port}`);
});