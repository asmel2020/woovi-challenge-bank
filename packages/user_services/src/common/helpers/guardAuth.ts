import configuration from '../../config/configuration';
import { decodeTokenJWT } from './generateTokenJWT';

const guardAuth = (authorization: string) => {
  try {
    const { id } = decodeTokenJWT<{ id: string }>(authorization, configuration.JWT_SECRET);
    return { userID: id };
  } catch (error) {
    return { userID: null };
  }
};

export default guardAuth;
