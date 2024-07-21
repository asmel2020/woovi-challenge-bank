import jwt from 'jsonwebtoken';

// import { User } from './model';

/* import User, { IUser } from './modules/user/UserModel'; */
import configuration from '../config/configuration';

export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null };

  try {
    const decodedToken = jwt.verify(token.substring(4), configuration.JWT_SECRET);

    const user = {id:' string'}/* await User.findOne({ _id: (decodedToken as { id: string }).id }); */

    return {
      user,
    };
  } catch (err) {
    return { user: null };
  }
};

export const generateToken = (user: any) => {
  return `JWT ${jwt.sign({ id: user._id }, configuration.JWT_SECRET)}`;
};
