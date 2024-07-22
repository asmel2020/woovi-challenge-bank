import jwt from 'jsonwebtoken';

import configuration from '../../config/configuration';
import { IUser } from '../../modules/auth/UserModel';

export const generateTokenJWT = (user: IUser) => jwt.sign({ id: user._id }, configuration.JWT_SECRET);