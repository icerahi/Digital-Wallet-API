"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const globalErrorHandler = (error, req, res, next) => {
    if (env_1.envVars.NODE_ENV === "development")
        console.log(error);
    let statusCode = 500;
    let message = `Someting went wrong!!`;
    // eslint-disable-next-line prefer-const
    let errorSource = [
    //{path:"",message:""}
    ];
    if (error.code === 11000) {
        statusCode = 400;
        message = error.message.match(/"([^"]*)"/);
    }
    else if (error.name === "CastError") {
        statusCode = 400;
        message = "Invalid MongoDB ObjectID. Please provide valid ID";
    }
    else if (error.name === "ZodError") {
        statusCode = 400;
        message = "Zod Error";
        error.issues.forEach((issue) => {
            errorSource.push({
                path: issue.path[issue.path.length - 1],
                message: issue.message,
            });
        });
    }
    else if (error.name === "ValidationError") {
        statusCode = 400;
        const errors = Object.values(error.errors);
        errors.forEach((errorObject) => errorSource.push({ path: errorObject.path, message: errorObject.message }));
        message = "Validation Error";
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
    }
    else if (error instanceof Error) {
        statusCode = 500;
        message = error.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        error: env_1.envVars.NODE_ENV === "development" ? error : null,
        stack: env_1.envVars.NODE_ENV === "development" ? error.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
