"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookie = void 0;
const env_1 = require("../config/env");
const setAuthCookie = (res, token) => {
    if (token.accessToken) {
        res.cookie("accessToken", token.accessToken, {
            httpOnly: true,
            secure: env_1.envVars.NODE_ENV === "production",
            sameSite: "none",
        });
    }
    if (token.refreshToken) {
        res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: env_1.envVars.NODE_ENV === "production",
            sameSite: "none",
        });
    }
};
exports.setAuthCookie = setAuthCookie;
