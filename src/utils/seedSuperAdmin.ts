import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      phone: envVars.SUPER_ADMIN_PHONE,
    });

    if (isSuperAdminExist) {
      console.log("Super Admin already exists");
      return;
    }
    console.log("Creating Super Admin... \n");
    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const payload: IUser = {
      fullname: "Super Admin",
      role: Role.SUPERADMIN,
      phone: envVars.SUPER_ADMIN_PHONE,
      password: hashedPassword,
    };
    const superAdmin = await User.create(payload);
    console.log("Super Admin Created Successfully");
    console.log(superAdmin);
  } catch (error) {
    console.log(error);
  }
};
