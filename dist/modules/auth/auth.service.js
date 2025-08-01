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
exports.authServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = require("http-status-codes");
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const createUserToken_1 = require("../../utils/createUserToken");
const jwt_1 = require("../../utils/jwt");
const user_model_1 = require("../user/user.model");
const credentialLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = payload;
    const isUserExist = yield user_model_1.User.findOne({ phone }).select("+password");
    if (!isUserExist) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    const isPasswordMatched = yield bcryptjs_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Password is incorrect");
    }
    const userTokens = (0, createUserToken_1.createUserToken)(isUserExist);
    const _a = isUserExist.toObject(), { password: pass } = _a, user = __rest(_a, ["password"]);
    return Object.assign(Object.assign({}, userTokens), { user });
});
const getNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedRefreshToken = (0, jwt_1.verifyToken)(refreshToken, env_1.envVars.JWT_REFRESH_TOKEN_SECRET);
    const isUserExist = yield user_model_1.User.findOne({ _id: verifiedRefreshToken.userId });
    if (!isUserExist)
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User does not exist");
    const JwtPayload = {
        userId: isUserExist._id,
        phone: isUserExist.phone,
        role: isUserExist.role,
    };
    const accessToken = (0, jwt_1.generateToken)(JwtPayload, env_1.envVars.JWT_ACCESS_TOKEN_SECRET, env_1.envVars.JWT_ACCESS_TOKEN_EXPIRES);
    return { accessToken };
});
exports.authServices = {
    credentialLogin,
    getNewAccessToken,
};
