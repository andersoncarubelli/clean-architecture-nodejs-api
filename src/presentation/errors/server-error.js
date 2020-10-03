module.exports = class ServerError extends Error {
    constructor(ParamNAme) {
        super("Internal error");
        this.name = "ServerError";
    }
};
