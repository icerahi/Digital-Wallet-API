import { Response } from "express";
import { envVars } from "../config/env";

export interface IAuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export const setAuthCookie = (res: Response, token: IAuthTokens) => {
  if (token.accessToken) {
    res.cookie("accessToken", token.accessToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "none",
    });
  }
  if (token.refreshToken) {
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: envVars.NODE_ENV === "production",
      sameSite: "none",
    });
  }
};
