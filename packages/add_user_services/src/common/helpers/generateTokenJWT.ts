import jwt from 'jsonwebtoken';
import configuration from '../../config/configuration';
import { IUser } from '../../modules/user/UserModel';

export const generateTokenJWT = (user: IUser,secretOrPrivateKey:string) => jwt.sign({ id: user._id }, secretOrPrivateKey);

export const decodeTokenJWT = <T>(token: string,secretOrPrivateKey:string): T => jwt.verify(token.split(' ')[1],secretOrPrivateKey) as T;
