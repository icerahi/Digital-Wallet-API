"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const http_status_codes_1 = require("http-status-codes");
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const user_interface_1 = require("../modules/user/user.interface");
const wallet_model_1 = require("../modules/wallet/wallet.model");
const jwt_1 = require("../utils/jwt");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.cookies.accessToken || req.headers.authorization;
        if (!accessToken)
            throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "No token recieved");
        const verifiedToken = (0, jwt_1.verifyToken)(accessToken, env_1.envVars.JWT_ACCESS_TOKEN_SECRET);
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError_1.default(403, "You are not authorize to access this route");
        }
        if (verifiedToken.role === user_interface_1.Role.USER ||
            verifiedToken.role === user_interface_1.Role.AGENT) {
            const isWalletExist = yield wallet_model_1.Wallet.findOne({
                owner: verifiedToken.userId,
            });
            if (!isWalletExist)
                throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Wallet doesn't exist");
            if (isWalletExist.isBlocked) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User Wallet is Blocked");
            }
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;
