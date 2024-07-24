import { IUser } from "../../modules/user/UserModel";

export interface IContext {
    isAuthApiKey: boolean;
    user:IUser;
  }