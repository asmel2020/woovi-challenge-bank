import jwt from 'jsonwebtoken';
import UserModel from '../../modules/user/UserModel';
import configuration from '../../config/configuration';
import { decodeTokenJWT } from './generateTokenJWT';

export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null };

  try {
    const decodedToken = decodeTokenJWT<{ id: string }>(token,configuration.JWT_SECRET);

    const user = await UserModel.findOne({ _id: decodedToken.id });

    return user
  } catch (err) {
    return  null ;
  }
};

