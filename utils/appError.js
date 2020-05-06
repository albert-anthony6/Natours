class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor); // When a new object is created and the contructor function is called, then that function call will not appear in the stack trace and it will not pollute it.
    }
}

module.exports = AppError;