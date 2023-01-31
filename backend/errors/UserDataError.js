class UserDataError extends Error {
    constructor(options) {
        super(options.message);
        this.message = options.message;
        this.name = options.name;
        this.code = options.code;
        this.stack = options.stack;
    }
}

module.exports = UserDataError;

