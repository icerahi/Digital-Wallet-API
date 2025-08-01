"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = require("http-status-codes");
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = payload, rest = __rest(payload, ["phone", "password"]);
    const isUserExist = yield user_model_1.User.findOne({ phone });
    if (isUserExist)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User already exist");
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const user = yield user_model_1.User.create(Object.assign({ phone, password: hashedPassword }, rest));
    const _a = user.toObject(), { password: pass } = _a, userInfo = __rest(_a, ["password"]);
    return userInfo;
});
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = query;
    const sort = query.sort || "-createdAt";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * Number(limit);
    const users = yield user_model_1.User.find(filter).sort(sort).skip(skip).limit(limit);
    const total = yield user_model_1.User.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    return { data: users, meta: { total, limit, page, totalPages } };
});
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    return user;
});
const suspendAgent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    if (user.role !== user_interface_1.Role.AGENT || !user.agentApproval) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User must be an approved Agent to be suspended");
    }
    user.role = user_interface_1.Role.USER;
    yield user.save();
    return user;
});
const approveAgent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    if (user.agentApproval) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Agent is already Approved");
    }
    if (user.role === user_interface_1.Role.USER) {
        user.role = user_interface_1.Role.AGENT;
        user.agentApproval = true;
    }
    else if (user.role === user_interface_1.Role.AGENT && !user.agentApproval) {
        user.agentApproval = true;
    }
    else {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid role for agent approval");
    }
    yield user.save();
    return user;
});
exports.userServices = {
    register,
    getAllUsers,
    getSingleUser,
    approveAgent,
    suspendAgent,
};
