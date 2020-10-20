module.exports = {
    mongoUrl:
        process.env.MONOGO_URL || "mongodb://localhost:xxxx/clean-node-api",
    tokenSecret: process.env.TOKEN_SECRET || "secret",
};
