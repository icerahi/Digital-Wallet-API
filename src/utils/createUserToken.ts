import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";

export const createUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    phone: user.phone,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_TOKEN_SECRET,
    envVars.JWT_ACCESS_TOKEN_EXPIRES
  );
  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_TOKEN_SECRET,
    envVars.JWT_REFRESH_TOKEN_EXPIRES
  );

  return { accessToken, refreshToken };
};
