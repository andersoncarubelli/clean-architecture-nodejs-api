module.exports = {
    mongoUrl:
        process.env.MONOGO_URL || "mongodb://localhost:27017/clean-node-api",
    tokenSecret: process.env.TOKEN_SECRET || "secret",
    port: process.env.PORT || 5858,
};
