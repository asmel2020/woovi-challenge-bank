import { UserModel } from '@bank/models';
import jwt from 'jsonwebtoken';
import { configurations } from '../config/configurations';

export const getUser = async (token: string | null | undefined) => {
  let tokensJWT = token;
  if (!tokensJWT) return null;

  try {
    tokensJWT = tokensJWT.replace('Bearer ', '');
    const decodedToken = jwt.verify(tokensJWT, configurations.JWT_SECRET) as { id: string };
    const user = await UserModel.findOne({ _id: decodedToken.id });
    return user;
  } catch (err) {
    return null;
  }
};
