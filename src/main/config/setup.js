const cors = require("../middlewares/cors");
const express = require("express");
const jsonParser = require("../middlewares/json-parser");

module.exports = (app) => {
    app.disable("x-powered-by");
    app.use(cors);
    app.use(jsonParser);
};
